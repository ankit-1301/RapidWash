const express = require("express");
const router = express.Router();
const Washerman = require("../model/washerman");
const jwt = require("jsonwebtoken");

//---------------------------------------WASHERMAN SIGNUP---------------------------------
router.post("/signup", async (req, res) => {
  try {
    const { username, email, password, address, city, pincode, shopname, contact, cost, hw, dc, oi, upi } = req.body;
    const us = await Washerman.findOne({ email });
    if (!us) {
      const user = new Washerman({ username, email, password, address, city, pincode, shopname, contact, cost, hw, dc, oi, upi });
      await user.save();
      res.json({ message: "Signup successful", washerman: user });
    }
    if (us) {
      res.json({ message: "User Already Exists" });
    }
  } catch (error) {
    console.log(error);
  }
});

//--------------------------------------WASHERMAN LOGIN---------------------------------------------
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Washerman.findOne({ email });
    if (!user) {
      res.json({ message: "User not found" });
    } else if (user.password !== password) {
      res.json({ message: "Invalid Password" });
    } else {
      const token = await user.generateAuthTokenwash();
      res.cookie("jwtokenwasherman", token, {
        expires: new Date(Date.now() + 86400000),
        httpOnly: true,
        sameSite: 'none',
        secure: true
      });
      res.status(200).json({ message: "Successfully logged in", washerman: user });
    }
  } catch (error) {
    console.log(error);
  }
});

//-------------------------------------ALL WASHERMAN DETAIL ||CITY WISE WASHERMAN ------------------------------------------
router.post("/all", (req, res) => {
  const { city } = req.body;
  if (city === 'all') {
    Washerman.find({}, (err, users) => {
      if (err) return res.status(500).send(err);
      res.status(200).send(users);
    });
  }
  else {
    Washerman.find({ city }, (err, users) => {
      if (!users) { res.json({ message: "No Washerman Available" }); }
      if (err) return res.status(500).send(err);
      res.status(200).send(users);
    });
  }
});

//---------------------------------------ALL WASHERMAN CITIES-------------------------------------------
router.get("/cities", (req, res) => {
  Washerman.find({}, 'city', (err, users) => {
    if (err) return res.status(500).send(err);
    const cities = [...new Set(users.map(user => user.city))];
    res.status(200).send(cities);
  });
});

//---------------------------------------WASHERMAN LOGOUT------------------------------------------------
router.get('/logout', (req, res) => {
  try {
    res.clearCookie("jwtokenwasherman", { path: "/",sameSite: 'none',
        secure: true });
    res.json({ message: "Logged out successfully" });
  } catch (error) {
    console.log(error);
  }
});

//-------------------------------------WASHERMAN LOGIN OR NOT WITH COOKIE & JWTTOKEN--------------------------------------
router.get('/check', (req, res) => {
  const token = req.cookies.jwtokenwasherman;
  if (!token) {
    res.json({ message: "washerman not login" });
  }
  else {
    res.json({ message: "washerman already login" });
  }

});

//------------------------------------LOGIN WASHERMAN ALL DETAIL WITH HELP OF JWT TOKEN------------------------------------------------
router.get('/getwash', async (req, res) => {
  const token = req.cookies.jwtokenwasherman;
  if (!token) {
  }
  else {
    try {
      const verify_token = jwt.verify(
        token,
        process.env.JWT_SECRET);
      root_user = await Washerman.findOne({
        _id: verify_token._id,
        token: token,
      });
      if (root_user) { res.json({ message: root_user }); }
    }
    catch { }
  }
});

//-------------------------------------------EDIT WASHERMAN PROFILE-----------------------------------
router.post('/update', async (req, res) => {
  try {
    const { _id, username, contact, pincode, address, shopname, city, cost, postImage, postsImage, hw, dc, oi, upi } = req.body;
    Washerman.findById(_id, (err, washerman) => {
      washerman.username = username;
      washerman.contact = contact;
      washerman.pincode = pincode;
      washerman.address = address;
      washerman.shopname = shopname;
      washerman.city = city;
      washerman.cost = cost;
      washerman.hw = hw;
      washerman.oi = oi;
      washerman.dc = dc;
      washerman.upi = upi;
      if (postImage) {
        washerman.image = postImage;
      } if (postsImage) {
        washerman.simage = postsImage;
      }
      washerman.save();
      res.json({ message: "edit washerman", washerman: washerman });
    })
  }
  catch (error) {
    console.log(error);
  }
});

module.exports = router;
