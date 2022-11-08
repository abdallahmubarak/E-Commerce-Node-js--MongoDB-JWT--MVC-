const mongoose =require('mongoose')

const productSchema =mongoose.Schema({
title:{type:String},
price:{type:Number},
details:{type:String},
image:{ type:String,
    default:""},
category:{type:mongoose.Schema.Types.ObjectId,ref:'Category'}

})
const Product =mongoose.model('Product',productSchema)
module.exports=Product