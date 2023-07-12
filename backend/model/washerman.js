const mongoose = require('mongoose');
// const { default: Washerman } = require('../../frontend/src/pages/Washerman');
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
  city:{
    type:String,
    require:true
  },
  pincode:{
    type:String,
    require:true
  },
  shopname:{
    type:String,
    require:true
  },
  contact:{
    type:String,
    require:true
  },
  cost:{
    type:String,
    require:true
  },
  hw:{
    type:String,
    require:true
  },
  dc:{
    type:String,
    require:true
  },
  oi:{
    type:String,
    require:true
  },
  upi:{
    type:String,
    require:true
  },
  token:{
    type:String,
  },
  image:{
    type:String,
  },
  simage:{
    type:String,
  }
},
{
    timestamps:true,
})
//----------------------------------------JWTTOKEN CREATE FUNCTION FOR WASHERMAN------------------------------------------------
userSchema.methods.generateAuthTokenwash = async function () {
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

const Washerman = mongoose.model('Washerman', userSchema);

module.exports = Washerman;