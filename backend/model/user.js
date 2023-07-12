const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  address:{
    type:String,
    require:true
  },
  contact:{
    type:String,
    require:true
  },
  pincode:{
    type:String,
    require:true
  },
  city:{
    type:String,
    require:true
  },
  occ:{
    type:String,
    require:true
  },
  image:{
    type:String,
  },
  token:{
    type:String,
  }
},
{
    timestamps:true,
})
//----------------------------------------JWTTOKEN CREATE FUNCTION FOR USER------------------------------------------------
userSchema.methods.generateAuthToken = async function () {
  try {
    const token_final = jwt.sign(
      { _id: this._id.toString() },
      process.env.JWT_SECRET
    );
    this.token = token_final;
    await this.save();
    return token_final;
  } catch (error) {
    console.log(error);
  }
};


const User = mongoose.model('User', userSchema);

module.exports = User;