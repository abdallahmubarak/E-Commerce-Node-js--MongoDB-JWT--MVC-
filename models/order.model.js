const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    deliveryInfo: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      phoneNumber: { type: String, required: true },
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    myCart:[{
      product:{type: mongoose.Schema.Types.ObjectId,ref: 'Product'}, 
      quantity: { type: Number }
  }],
    taxPrice: { type: Number },
    shippingPrice: { type: Number },
    paidAt: Date,
    orderStatus: { type: String, enum:["cancel", "Processing","was deliverd"]},
    deliveredAt: Date,
    totalAmount: Number,
  },
  {
    timestamps: true,
  }
);



const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
