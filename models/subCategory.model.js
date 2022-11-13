const mongoose =require('mongoose')
const slugify = require("slugify");


const subCategorySchema =mongoose.Schema({

    title:{type:String},
    products:{type:mongoose.Schema.Types.ObjectId,ref:'Product'},
    Category:{type:mongoose.Schema.Types.ObjectId,ref:'Category'},
    slug: String
},  { timestamps: true }

)

subCategorySchema.pre("save", function (next) {
    this.slug = slugify(this.title, { lower: true });
    next();
  });
 
  
  
const subCategory =mongoose.model('subCategory',subCategorySchema)
module.exports=subCategory