const express = require("express");
const router = express.Router();
const User = require("../model/user");
const jwt = require("jsonwebtoken");

//------------------------------------------USER SIGN UP-------------------------------------------
router.post("/signup", async (req, res) => {
  try {
    const { username, email, password, address, contact, pincode, city, occ } = req.body;
    const us = await User.findOne({ email });
    if (!us) {
      const user = new User({ username, email, password, address, contact, pincode, occ, city, image: "" });
      await user.save();
      res.status(200).json({ message: "Signup successful", user: user });
    }
    if (us) {
      res.json({ message: "User Already Exists" });
    }
  } catch (error) {
    console.log(error);
  }
});

//------------------------------------------------USER LOGIN WITH JWT TOKEN-----------------------------------------
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      res.json({ message: "User not found" });
    } else if (user.password !== password) {
      res.json({ message: "Invalid Password" });
    } else {
      const token = await user.generateAuthToken();
      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 86400000),
        httpOnly:true,
        sameSite: 'none',
        secure: true
      });
      res.status(200).json({ message: "Successfully logged in", user: user });
    }
  } catch (error) {
    console.log(error);
  }
});


//--------------------------------------------------Logout------------------------------------------------
router.get('/logout', async (req, res) => {
  try {
    
    res.clearCookie("jwtoken", {
  path: "/",
  httpOnly: true,
  sameSite: "none",
  secure: true
});
    res.set('Cache-Control', 'no-store');
    res.json({ message: "Logged out successfully" });
  } catch (error) {
    console.log(error);
  }
});

//-----------------------------------------CHECK USER ALREDY LOGIN OR NOT-------------------------------------
router.get('/check', async (req, res) => {
  const token = req.cookies.jwtoken;
  if (!token) {
    res.json({ message: "user not login" });
  }
  else {
    try {
      const verify_token = jwt.verify(
        token,
        process.env.JWT_SECRET);
      root_user = await User.findOne({
        _id: verify_token._id,
        token: token,
      });
      if (root_user) { res.json({ message: "user already login" }); }
      else { res.json({ message: "user not login" }); }
    }
    catch { }
  }
});

//-----------------------------------GET USER INFO FROM COOKIE WITH JWTTOKEN------------------------------------
router.get('/get', async (req, res) => {
  const token = req.cookies.jwtoken;
  if (!token) {
  }
  else {
    try {
      const verify_token = jwt.verify(
        token,
        process.env.JWT_SECRET);
      root_user = await User.findOne({
        _id: verify_token._id,
        token: token,
      });
      if (root_user) { res.json({ message: root_user }); }
    }
    catch { }
  }
});

//---------------------------------------UPDATE PROFILE-------------------------------------------------------
router.post("/update", async (req, res) => {
  try {
    const { _id, username, address, contact, pincode, city, occ, postImage } = req.body;
    User.findById(_id, (err, user) => {
      user.username = username;
      user.address = address;
      user.contact = contact;
      user.pincode = pincode;
      user.city = city;
      user.occ = occ;
      if (postImage) { user.image = postImage }
      user.save();
      res.json({ message: "edit user", user: user });
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
