const mongoose =require('mongoose')

const categorySchema =mongoose.Schema({
    title:{type:String},
    image:{type:String},
    subCategory:{type:mongoose.Schema.Types.ObjectId,ref:'subCategory'}
},
{ timestamps: true })
const Category=mongoose.model('Category',categorySchema)
module.exports=Category