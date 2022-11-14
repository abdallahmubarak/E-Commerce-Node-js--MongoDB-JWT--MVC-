const { resBuilder } = require('../helper/app.helper');
const productModel =require('../models/product.model')
const userModel = require('../models/user.model')
class Product{

    static add_product =async(req,res)=>{
        try {
            const product =new productModel(req.body)
            product.save();
            resBuilder(res,true,product,"product added")

        } catch (error) {
            resBuilder(res,false,error,error.message)
        }


    }
    static delete_product =async(req,res)=>{
        try {
            const productId=req.params.id
            //console.log(productId)
            const product = await productModel.findById(productId)            
            //console.log(product)
            await product.remove();
            resBuilder(res,true,[],"product added")

        } catch (error) {
            resBuilder(res,false,error,error.message)
        }
    }
    static view_product=async(req,res)=>{
        try {
            const productId=req.params.id
            console.log(productId)
            const product = await productModel.findById(productId)
            console.log(product)

            resBuilder(res,true,product,"product view")

        } catch (error) {
            resBuilder(res,false,error,error.message)
        }
    }
    static view_all_product=async(req,res)=>{
        try {
        const products =await productModel.find()
        resBuilder(res,true,products,"products view")

    } catch (error) {
        resBuilder(res,false,error,error.message)

        }
    }
    static edit_product=async(req,res)=>{
        try {
            const productId = req.params.id;
        const Data=req.body
        const product = await productModel.findById(productId)
        for(const key in Data){
            product[key]=Data[key]
        }
        product.save()
        resBuilder(res,true,product,"products view")

        } catch (error) {
            resBuilder(res,false,error,error.message)
        }
    }
    static add_To_Cart=async(req,res)=>{
        try {
            const productId=req.params.id
            const userCart=req.user
            const product =await productModel.findById(productId)
            userCart.myCart.push({
                productTitle:product.title,
                productId:product._id
            })
            await userCart.save()
            resBuilder(res,true,userCart,"products view")

        } catch (error) {
            resBuilder(res,false,error,error.message)
        }
    }
    static del_from_cart=async(req,res)=>{
        try {
            const productId=req.params.id
            const userCart=req.user
            userCart.myCart = userCart.myCart.filter((c)=>c.productId!=productId)
            await userCart.save()
            resBuilder(res,true,userCart,"product delete")

        } catch (error) {
            resBuilder(res,false,error,error.message)
        }
    }
    static getCart= async(req,res)=>{
        try {
        const user =req.user;
        user.populate('myCart.product')
        const products = user.myCart;
        resBuilder(res,true,products,"my cart")
   
        } catch (error) {
            resBuilder(res,false,error,error.message)

        }

    }
    static add_to_whatlist=async(req,res)=>{
        try {
            const productId = req.params.id
            const userWhatlist=req.user
            const product =await productModel.findById(productId)
            userWhatlist.wishList.push({
                productTitle:product.title,
                productId:product._id
            })
            product.save()
            resBuilder(res,true,userCart,"product delete")
        } catch (error) {
            resBuilder(res,false,error,error.message)

        }

    }
    static removeFromWhishlist=async(req,res)=>{
        try {
            const productId=req.params.id
            const userWhatlist=req.user
            userWhatlist.wishList = userWhatlist.wishList.filter((c)=>c.productId!=productId)
            await userWhatlist.save()
            resBuilder(res,true,[],"product delete")

        } catch (error) {
            resBuilder(res,false,error,error.message)
        }
    }
    
    static getWhishlist= async(req,res)=>{
        try {
            const user = req.user
            user.populate('wishList.product')
            const products =user.myCart
            resBuilder(res,true,products,'whishlist')
        } catch (error) {
            resBuilder(res,true,error,error.message)
        }

    }

}
module.exports=Product;