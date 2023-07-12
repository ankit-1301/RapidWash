const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    require: true
  },
  uemail: {
    type: String,
    required: true,

  },
  wemail: {
    type: String,
    required: true,

  },
  shopname: {
    type: String,
    required: true,

  },
  address: {
    type: String,
    require: true
  },
  city: {
    type: String,
    require: true
  },
  pincode: {
    type: String,
    require: true
  },
  pair: {
    type: String,
    require: true
  },
  cost: {
    type: String,
    require: true
  },
  status: {
    type: String,
    require: true
  },
  costp: {
    type: String,
    require: true
  },
  type: {
    type: String,
    require: true
  },
  payment: {
    type: String,
    require: true
  },
  reff: {
    type: String,
    
  },
  delivery:{
    name:{type: String},
    email:{type: String},
    contact:{type: String},
    otp:{type: String},
  },
  date: { type: Date, default: Date.now }
},
  {
    timestamps: true,
  })

const Order = mongoose.model('Order', userSchema);

module.exports = Order;