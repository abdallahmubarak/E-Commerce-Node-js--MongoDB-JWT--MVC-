const { resBuilder } = require('../helper/app.helper')
const subCategoryModel =require('../models/subCategory.model')
const categoryModel =require('../models/category.model')

class subCategory{
    static create_subCategory =async(req,res)=>{
        try {
        const categoryid = req.params.categoryId
        const newSubcategory = new subCategoryModel(req.body) 
        const savedSubcategory = await newSubcategory.save();
        
        const updatedCategory = await categoryModel.findByIdAndUpdate(
            categoryid,
            { $push: { subCategories: savedSubcategory._id } },
            { new: true }
          );
        //const category =await categoryModel.findById(categoryId)
        //category.savedSubcategory.push({
          //  subCategories: savedSubcategory._id
        //});
        updatedCategory.save()

        resBuilder(res,true,updatedCategory,"subCategory added")
    } catch (error) {
            
        }

    }
    static delete_subCategory =async(req,res)=>{
        
    }
    static edit_subCategory =async(req,res)=>{
        
    }
    static get_subCategory =async(req,res)=>{
        
    }
    static get_all_subCategorys =async(req,res)=>{
        
    }


}
module.exports =subCategory