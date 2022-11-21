const orderModel =require('../models/order.model')
const {resBuilder}= require('../helper/app.helper')
const UserModel = require("../models/user.model");

class Order{
    
    static totalPrice =async(req,res)=>{
       try {
        let products;
        let total = 0;
        const user=req.user
        const cart =user.populate('myCart.product')
        //console.log(cart)
        products = user.myCart;
        console.log(products)
        products.forEach(p => {
            console.log(p.productId.price)
            console.log(p.quantity)

        total += p.quantity * p.productId.price;     
        })
        

        resBuilder(res,true,data,"order")  

       } catch (error) {
        
        resBuilder(res,false,error,error.message)     
       
    }
    }
    static createOrder =async(req,res)=>{
        try {
            req.body.paidAt = Date.now();
            req.body.user = req.user.id
            const newOrder =new orderModel(req.body)
            const savedOrder = await newOrder.save();
            const updatedUser = await UserModel.findByIdAndUpdate(
            req.user.id,
            { $push: { orders: savedOrder._id } },
            { new: true }
    ); 
    resBuilder(res,true,savedOrder,"order")     
            
        } catch (error) {
        resBuilder(res,false,error,error.message)     
        }
    }
    static getOrder =async(req,res)=>{
        try {
            const orderId =req.params.id
            const order = await orderModel.find(orderId)
            resBuilder(res,true,order,'order')
        } catch (error) {
            resBuilder(res,false,error,error.message)

        }
    }
    static getMyOrders =async(req,res)=>{
        try {
            const orderId =req.params.id
            const user =req.user;
            user.populate('orders')
            const myOrders = user.orders;
            resBuilder(res,true,myOrders,"my orders")
        } catch (error) {
            resBuilder(res,false,error,error.message)

        }
    } 
     static processOrder =async(req,res)=>{
        try {
            const orderId=req.params.orderId
            const order = await Order.findById(orderId);
            if (!order) {return next(new AppError("Order not found", 404));}
            order.orderStatus === "Delivered"

            const updatedOrder = await Order.findByIdAndUpdate(
                orderId,
                { $set: req.body },
                { new: true }
              );
              resBuilder(res,true,updatedOrder," order")
        } catch (error) {
            resBuilder(res,false,error,error.message)

        }
    } 

    
}

module.exports =Order

