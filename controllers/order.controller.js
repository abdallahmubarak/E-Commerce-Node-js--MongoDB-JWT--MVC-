const orderModel =require('../models/order.model')

const {resBuilder}= require('../helper/app.helper')
const UserModel = require("../models/user.model");

class Order{
    static createOrder =async(req,res)=>{
        try {
           // const user = req.user
            req.body.paidAt = Date.now();
            //req.body.user = req.user.id;
            req.body.totalAmount =
              req.body.itemsPrice + req.body.taxPrice + req.body.shippingPrice;
            const newOrder = new orderModel(req.body);
            const savedOrder = await newOrder.save();
            const updateUser = UserModel.findByIdAndUpdate(
                req.user.id,
                {$push:{orders:savedOrder._id}},
                {new:true})
            resBuilder(res,true,savedOrder,"order")     
                
        } catch (error) {
            resBuilder(res,false,error,error.message)     
            
        }    
    }
    static getOrder =async(req,res)=>{
        try {
            const order =await orderModel.findById(req.params.id)
            resBuilder(res,true,order,"order")     


        } catch (error) {
            resBuilder(res,false,error,error.message)     

        }
    }
    static updateOrder =async(req,res)=>{
        try {
            const order = await orderModel.findById(req.params.orderId);
    if (!order) {
      throw new Error( "Order not found")
    }
    const updatedOrder = await orderModel.findByIdAndUpdate(
      req.params.orderId,
      { $set: req.body },
      { new: true }
    );
    resBuilder(res,true,updatedOrder,"order updated")     

        } catch (error) {
            resBuilder(res,false,error,error.message)     

        }
    }
    
    static deleteOrder =async(req,res)=>{
        try {
            const order = await Order.findById(req.params.orderId);
            if (!order) {
              throw new Error("Order not found");
            }
            const deletedOrder = await orderModel.findByIdAndDelete(req.params.orderId);
            const updatedUser = await User.findByIdAndUpdate(
              order.user._id,
              { $pull: { orders: order._id } },
              { new: true }
            );
            resBuilder(res,false,'',"order deleted")     

        
        } catch (error) {
            resBuilder(res,false,error,error.message)     

        }
        
    }




}

module.exports =Order