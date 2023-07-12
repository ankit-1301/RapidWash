const express = require("express");
const router = express.Router();
const Deliveryboy = require("../model/deliveryboy");
const jwt = require("jsonwebtoken");

//------------------------------------DELIVERYBOY SIGNUP----------------------------------------------
router.post("/signup", async (req, res) => {
  try {
    const { email, wemail, password, contact, name } = req.body;
    const us = await Deliveryboy.findOne({ email });
    if (!us) {
      const boy = new Deliveryboy({ email, wemail, password, contact, name });
      await boy.save();
      res.status(200).json({ message: "Signup successful", boy: boy });
    }
    if (us) {
      res.json({ message: "Boy Already Exists" });
    }
  } catch (error) {
    console.log(error);
  }
});

//----------------------------------------DELIVERYBOYS DETAIL WHO WORK UNDER SPECIFIC WASHERMAN---------------------------------------
router.post("/getboy", async (req, res) => {
  try {
    const { wemail } = req.body;

    const boys = await Deliveryboy.find({ wemail });
    if (!boys) {
      res.json({ message: "no Boy" });
    } else {
      res.json({ message: "Boy Detail", boys: boys });
    }
  } catch (error) {
    console.log(error);
  }
});

//----------------------------------------GET DELIVERYBOY INFO FROM HIS EMAIL--------------------------------------------------
router.post("/getboybyemail", async (req, res) => {
  try {
    const { email } = req.body;
    const boy = await Deliveryboy.findOne({ email });
    if (!boy) {
      res.json({ message: "no Boy" });
    } else {
      res.json({ message: "Boy Detail", boy: boy });
    }
  } catch (error) {
    console.log(error);
  }
});

//----------------------------------------DELETE DELIVERYBOY --------------------------------------------------------------------------
router.post("/delete", async (req, res) => {
  try {
    const { _id } = req.body;
    const boy = await Deliveryboy.findByIdAndDelete(_id);
    res.json({ message: "delete order" });
  } catch (error) {
    console.log(error);
  }
});

//-------------------------------------DELIVERYBOY LOGIN WITH JWTTOKEN ------------------------------------------------------------------
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Deliveryboy.findOne({ email });
    if (!user) {
      res.json({ message: "User not found" });
    } else if (user.password !== password) {
      res.json({ message: "Invalid Password" });
    } else {
      const token = await user.generateAuthTokendel();
      res.cookie("jwtokendel", token, {
        expires: new Date(Date.now() + 86400000),
        httpOnly: true,
        sameSite: 'none',
        secure: true
      });
      res.status(200).json({ message: "Successfully logged in", boy: user });
    }
  } catch (error) {
    console.log(error);

  }
});
//------------------------------------------GET DELIVERYBOY DETAIL FROM COOKIE WITH JWTTOKEN----------------------------------------------------
router.get('/get', async (req, res) => {
  const token = req.cookies.jwtokendel;
  if (!token) {
    res.json({ message: "user not login"});
  }
  else {
    try {
      const verify_token = jwt.verify(
        token,
        process.env.JWT_SECRET);
      root_user = await Deliveryboy.findOne({
        _id: verify_token._id,
        token: token,
      });
      if (root_user) { res.json({ boy: root_user }); }
    }
    catch { }

  }
});

//---------------------------------------DELIVERYBOY ALREDY LOGIN OR NOT WITH JWTTOKEN---------------------------------------
router.get('/check', (req, res) => {
  const token = req.cookies.jwtokendel;
  if (!token) {
    res.json({ message: "boy not login" });
  }
  else {
    res.json({ message: "boy already login" });
  }
});


//-----------------------------------------------DELIVERYBOY LOGOUT----------------------------------------------------
router.get('/logout', (req, res) => {
  try {
    res.clearCookie("jwtokendel", { path: "/" ,sameSite: 'none',
        secure: true});
    res.json({ message: "Logged out successfully" });
  } catch (error) {
    console.log(error);
  }
});


module.exports = router;
