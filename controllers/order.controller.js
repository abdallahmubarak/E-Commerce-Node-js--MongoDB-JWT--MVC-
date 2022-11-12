const orderModel =require('../models/order.model')

const {resBuilder}= require('../helper/app.helper')
const UserModel = require("../models/user.model");

class Order{
   
    static createOrder =async(req,res)=>{
        try {

            req.body.paidAt = Date.now();
            let products;
            let totalAmount = 0;
            req.user.populate('myCart.product')
            products = user.myCart;
            //console.log(products)
            products.forEach(element => {
            req.body.totalAmount += element.quantity * element.product.price
            }
            )
            console.log(totalAmount)
            const newOrder = new orderModel(req.body);
            const savedOrder = await newOrder.save();
            console.log(savedOrder)

            const updateUser = UserModel.findByIdAndUpdate(
                req.user.id,
                {$push:{orders:savedOrder._id}},
                {new:true})
            resBuilder(res,true,savedOrder,totalAmount,"order")     
                
        } catch (error) {
            resBuilder(res,false,error,error.message)     
            
        } 
    }   
    }

module.exports =Order