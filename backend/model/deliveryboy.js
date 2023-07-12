const mongoose = require('mongoose');
// const { default: Washerman } = require('../../frontend/src/pages/Washerman');
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email:{
    type:String,
    required:true,
  },
  password:{
    type:String,
    required:true,
  },
  contact:{
    type:String,
    required:true,
  },
  wemail:{
    type:String,
    required:true,
  },
  token:{
    type:String,
  },
},
{
    timestamps:true,
})
//----------------------------------------JWTTOKEN CREATE FUNCTION FOR DELIVERYBOY------------------------------------------------
userSchema.methods.generateAuthTokendel = async function () {
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

const Deliveryboy = mongoose.model('Deliveryboy', userSchema);

module.exports = Deliveryboy;