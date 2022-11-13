const orderModel =require('../models/order.model')
const {resBuilder}= require('../helper/app.helper')
const UserModel = require("../models/user.model");

class Order{
    
   
    static totalPrice =async(req,res)=>{
        try {

            let products;
            req.user.populate('myCart.product')
            products = req.user.myCart;
            console.log(products)
             products.reduce(
                (acc, el) => acc + el.product.price * el.quantity,
             console.log(el)
              );
              return totalAmount;
            
            //products.forEach(element => {
            //totalAmount += element.quantity * element.product.price})
            //console.log(totalAmount)
            resBuilder(res,true,savedOrder,totalAmount,"order")     
                
        } catch (error) {
            resBuilder(res,false,error,error.message)     
            
        } 
    }   
    }

module.exports =Order