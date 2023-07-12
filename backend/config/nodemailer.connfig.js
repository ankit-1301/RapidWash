const nodemailer = require("nodemailer");
const user = process.env.USER;
const pass = process.env.PASS;
const transport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: user,
      pass: pass,
    },
  });
//-----------------------------------SEND MAIL FOR ORDER APPROVE BY WASHERMAN ---------------------------------------------------
  module.exports.sendApprove = (name, email,status,_id,shopname) => {
    transport
      .sendMail({
        from: user,
        to: email,
        subject: "Your Order has been Approve",
        html: `<h1>Order Approve</h1>
            <h2>Hello ${name}</h2>
            <h3>Thank you for Book Order.</h3>
            <h3>Your Order : ${_id}  Approved By ${shopname}.</h3>
            <h3>Your Order Status is ${status}</h3>
            <a href=http://localhost:3000/user/order/approve> Click here</a>
            </div>`,
      })
      .catch((err) => console.log(err));
  };

//---------------------------------------SEND DELIVERYBOY DETAIL TO USER ------------------------------------------------------
  module.exports.senddeli = (name,email,contact,demail) => {
    transport
      .sendMail({
        from: user,
        to: email,
        subject: "Your Order has been Approve",
        html: `<h1>Order delivery</h1>
            <h4>Deliveryboy Name:${name}</h4>
            <h4>Deliveryboy contact:${contact}</h4>
            <h4>Deliveryboy email: ${demail}</h4>
            <a href=http://localhost:3000/user/order/approve> Click here</a>
            </div>`,
      })
      .catch((err) => console.log(err));
  };

//-----------------------------------------------ORDER STATUS CHANGE INFO ---------------------------------------------------------
  module.exports.sendStatus = (name, email,status,_id,shopname) => {
    transport
      .sendMail({
        from: user,
        to: email,
        subject: "Your Order Status has been Change",
        html: `<h1>Order Status</h1>
            <h2>Hello ${name}</h2>
            <h3>Thank you for Book Order.</h3>
            <h3>Your Order : ${_id}  Approved By ${shopname}.</h3>
            <h3>Your Order Status is Change to </h3><h3 class="text-red-500"> ${status}</h3>
            <a href=http://localhost:3000/user/order/approve> Click here</a>
            </div>`,
      })
      .catch((err) => console.log(err));
  };

  //------------------------------------------------ORDER DELETE BY WASHERMAN------------------------------------------------------
  module.exports.Delete = (name, email,_id,shopname) => {
    transport
      .sendMail({
        from: user,
        to: email,
        subject: "Your Order has been Cancel",
        html: `<h1>About Your Order</h1>
            <h2>Hello ${name}</h2>
            <h3>Thank you for Book Order.</h3>
            <h3>Your Order : ${_id}  Approved By ${shopname}.</h3>
            <h4>Your Order Cancel Due Some Reason Book Your Order After Some time</h4>
            <a href=http://localhost:3000/user/order/approve> Click here</a>
            </div>`,
      })
      .catch((err) => console.log(err));
  };

  //------------------------------------------SEND OTP FOR ORDER -----------------------------------------------------------------
  module.exports.sendopt = (name, email,_id,otp) => {
    transport
      .sendMail({
        from: user,
        to: email,
        subject: "Your Order OPT",
        html: `<h1>About Your Order</h1>
            <h2>Hello ${name}</h2>
            <h3>Thank you for Book Order.</h3>
            <h3>Your Order : ${_id}  OTP ${otp}.</h3>
           
            </div>`,
      })
      .catch((err) => console.log(err));
  };