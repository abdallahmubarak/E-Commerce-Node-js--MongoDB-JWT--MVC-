const mongoose =require('mongoose')
const subCategorySchema =mongoose.Schema({
    name:{type:String},
    products:{type:mongoose.Schema.Types.ObjectId,ref:'Product'},
    category:{type:mongoose.Schema.Types.ObjectId,ref:'Category'},
    


})
const subCategory =mongoose.model('subCategory',subCategorySchema)
module.exports=subCategory