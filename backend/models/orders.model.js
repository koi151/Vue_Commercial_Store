const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema(
{
  customerInfo: {
    fullName: String,
    address: String,
    phone: String,
    notes: String,
    payment: String
  },
  cart: [
    {
      productId: String,
      thumbnail: String,
      title: String,
      quantity: Number,
      price: Number
    }
  ]
},
{ timestamps: true })

const Orders = mongoose.model("Orders", orderSchema, 'orders');

module.exports = Orders;