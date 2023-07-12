const express = require("express");
const router = express.Router();
const nodemailer = require("../config/nodemailer.connfig");
const Order = require("../model/order");
const crypto = require('crypto');

//-----------------------------GENERATE OTP FOR---------------------------------------------------
function generateOTP() {
  const OTP_LENGTH = 6;
  const otp = crypto.randomInt(Math.pow(10, OTP_LENGTH)).toString().padStart(OTP_LENGTH, '0');
  return otp;
}

//------------------------------------BOOK ORDER-----------------------------------------------------
router.post("/book", async (req, res) => {
  try {
    const { username, contact, uemail, wemail, shopname, address, city, pincode, cost, pair, costp, type, payment, reff } = req.body;
    const order = new Order({ username, contact, uemail, wemail, shopname, address, city, pincode, cost, pair, status: "Under Approval", costp, type, reff, payment });
    await order.save();
    res.json({ message: "Booked successful" });
  } catch (error) {
    console.log(error);
  }
});

//----------------------------------------------EDIT ORDER BY USER----------------------------------------------
router.post("/edit", async (req, res) => {
  try {
    const { _id, username, contact, uemail, wemail, shopname, address, city, pincode, cost, pair, } = req.body;
    Order.findById(_id, (err, order) => {
      if (err) return res.status(500).send(err);
      order.username = username;
      order.contact = contact;
      order.uemail = uemail;
      order.wemail = wemail;
      order.shopname = shopname;
      order.address = address;
      order.city = city;
      order.pincode = pincode;
      order.cost = cost;
      order.pair = pair;
      order.save();
      res.json({ message: "edit successful" });
    });
  } catch (error) {
    console.log(error);
  }
});

//-------------------------------------------ADD DELIVERYBOY OBJECT IN ORDER---------------------------------------------------
router.post("/editdel", async (req, res) => {
  try {
    const { _id, Deliveryboy } = req.body;
    Order.findById(_id, (err, order) => {
      if (err) return res.status(500).send(err);
      order.delivery.name = Deliveryboy.name;
      order.delivery.email = Deliveryboy.email;
      order.delivery.contact = Deliveryboy.contact;
      order.delivery.otp = generateOTP();
      order.save();
      nodemailer.senddeli(order.delivery.name, order.uemail, order.delivery.contact, order.delivery.email);
      res.json({ message: "edit successful" });
    });
  } catch (error) {
    console.log(error);
  }
});

//-------------------------------------------FIND ORDER WHERE WASHERMAN EMAIL:  && STATUS:  ---------------------------------------------
router.post("/req", async (req, res) => {
  try {
    const { wemail, status } = req.body;
    const orders = await Order.find({ wemail, status });
    if (!orders) {
      res.json({ message: "no Order" });
    } else {
      res.json({ message: "Order Detail", orders: orders });
    }
  } catch (error) {
    console.log(error);
  }
});

//--------------------------------------------DISPLAY ALL ORDER BOOK BY THIS USER: ----------------------------------------
router.post("/detail", async (req, res) => {
  try {
    const { uemail, status } = req.body;
    const orders = await Order.find({ uemail, status });
    if (!orders) {
      res.json({ message: "no Order" });
    } else {
      res.json({ message: "Order Detail", orders: orders });
    }
  } catch (error) {
    console.log(error);
  }
});

//------------------------------------------CHANGE STATUS OF ORDER -----------------------------------------------------------
router.post("/status", async (req, res) => {
  try {
    const { _id } = req.body;
    Order.findById(_id, (err, order) => {
      if (err) return res.status(500).send(err);
      if (order.status === "Under Approval") {
        order.status = "Picking";
        nodemailer.sendApprove(order.username, order.uemail, order.status, order._id, order.shopname); //SENDING MAIL
      }
      else if (order.status === "Picking") {
        order.status = "Picked";
        nodemailer.sendStatus(order.username, order.uemail, order.status, order._id, order.shopname); //SENDING MAIL
      }
      else if (order.status === "Picked") {
        order.status = "Processing";
        nodemailer.sendStatus(order.username, order.uemail, order.status, order._id, order.shopname); //SENDING MAIL
      } else if (order.status === "Processing") {
        order.status = "Done";
        nodemailer.sendStatus(order.username, order.uemail, order.status, order._id, order.shopname); //SENDING MAIL
      } else if (order.status === "Done") {
        order.status = "Delivered";
        nodemailer.sendStatus(order.username, order.uemail, order.status, order._id, order.shopname); //SENDING MAIL
      }
      order.save((err, orders) => {
        if (err) return res.status(500).send(err);
        res.send(orders);
      });
    });
  } catch (error) {
    console.log(error);
  }
});

//----------------------------------DELETE ORDER-----------------------------------------------------
router.post("/delete", async (req, res) => {
  try {
    const { _id } = req.body;
    const order = await Order.findByIdAndDelete(_id);
    res.json({ message: "delete order" });
    nodemailer.Delete(order.username, order.uemail, order.status, order._id, order.shopname);
  } catch (error) {
    console.log(error);
  }
});

//----------------------------------------WASHERMAN DASBOARD VALUE -----------------------------------------------
router.post("/dashorderdetail", async (req, res) => {
  try {
    const { email } = req.body;
    const count = await Order.countDocuments({ status: "Delivered", wemail: email });
    const orders = await Order.find({ status: "Delivered", wemail: email }, "cost");
    const totalCost = orders.reduce(
      (acc, order) => acc + Number(order.cost),
      0
    );
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    const mcount = await Order.countDocuments({
      status: "Delivered",
      wemail: email,
      date: { $gte: oneMonthAgo },
    });
    const morders = await Order.find({
      status: "Delivered",
      wemail: email,
      date: { $gte: oneMonthAgo },
    });
    const totalMCost = morders.reduce(
      (acc, order) => acc + Number(order.cost),
      0
    );

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tcount = await Order.countDocuments({
      status: "Delivered",
      wemail: email,
      date: { $gte: today },
    });
    const tpcount = await Order.countDocuments({
      status: "Processing",
      wemail: email,
      date: { $gte: today },
    });
    const tacount = await Order.countDocuments({
      status: "Under Approval",
      wemail: email,
      date: { $gte: today },
    });
    const torders = await Order.find({
      status: "Delivered",
      wemail: email,
      date: { $gte: today },
    });
    const totalTCost = torders.reduce(
      (acc, order) => acc + Number(order.cost),
      0
    );
    res.status(200).json({ count, totalCost, totalMCost, mcount, tcount, totalTCost, tpcount, tacount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//-------------------------------------DONE ORDER BY SPECIFIC USER AND THEIR TOTAL COST---------------------------------------
router.post("/userorderdetail", async (req, res) => {
  try {
    const { email } = req.body;
    const count = await Order.countDocuments({ status: "Done", uemail: email });
    const orders = await Order.find({ status: "Done", uemail: email }, "cost");
    const totalCost = orders.reduce(
      (acc, order) => acc + Number(order.cost),
      0
    );
    res.status(200).json({ count, totalCost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//------------------------------------DISPLAY ORDERS WHICH WILL PICK BY SPECIFIC DELIVERYBOY------------------------------------
router.post("/reqdelboy", async (req, res) => {
  try {
    const { email, status } = req.body;

    const orders = await Order.find({ "delivery.email": email, status });
    if (orders.length === 0) {
      res.json({ message: "No orders found for this email." });
    } else {
      res.json({ message: "Order details", orders: orders });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

//------------------------------------SEND OTP BY DELIVERYBOY TO USER-----------------------------------------------
router.post("/reqdelboyotp", async (req, res) => {
  try {
    const { _id } = req.body;
    const order = await Order.findOne({ _id });
    if (order.length === 0) {
      res.json({ message: "No orders found for this email." });
    } else {
      res.json({ message: "Order details", order: order });
      nodemailer.sendopt(order.username, order.uemail, order._id, order.delivery.otp); //SEND MAIL
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

//----------------------------------STATUS CHANGE BY DELIVERYBOY AND VERIFY OTP---------------------------------
router.post("/reqdelboystatuschange", async (req, res) => {
  try {
    const { _id, otp } = req.body;
    const order = await Order.findOne({ _id });
    if (order) {
      console.log(order, order.delivery.otp);
      if (order.delivery.otp = otp) {
        order.status = "Picked";
      }
      order.save((err, orders) => {
        if (err) return res.status(500).send(err);
        res.send(orders);
      });
    } else {
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});



module.exports = router;
