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

        resBuilder(res,true,updatedCategory,"subCategory added")
    } catch (error) {
      resBuilder(res,false,error,error.message)

        }

    }
    static delete_subCategory =async(req,res)=>{
      try {
        const subcategory = await subCategoryModel.findById(req.params.subcategoryId);
        if (!subcategory) {
          return next(new AppError("Subcategory not found", 404));
        }
        const updatedCategory = await categoryModel.findByIdAndUpdate(
          req.params.categoryId,
          { $pull: { subCategories: subcategory._id } },
          { new: true }
        );
        const deletedProducts = await Product.deleteMany({
          subCategory: subcategory._id,
        });
        const deletedSubcategory = await subCategoryModel.findByIdAndDelete(
          req.params.subcategoryId
        );
        resBuilder(res,true,[],"subcategory del")
        }
        catch(error){
          resBuilder(res,false,error,error.message)
        } 
    }
    static edit_subCategory =async(req,res)=>{
      try {
        const subcategoryId=req.params.subcategoryId
        const subcategory = await subCategoryModel.findById(subcategoryId);
      if (!subcategory) {
        return next(new AppError("Subcategory not found", 404));
      }
      const updatedSubcategory = await subCategoryModel.findByIdAndUpdate(
        subcategoryId,
        { $set: req.body },
        { new: true }
      );
      resBuilder(res,true,updatedSubcategory,"subcategory found")


      } catch (error) {
        resBuilder(res,false,error,error.message)

      }
    }
    static get_subCategory =async(req,res)=>{
       try {
        const subCategoryId= req.params.id
        const subcategory = await subCategoryModel.findById(subCategoryId);
        if (!subcategory) {
          return next(new AppError("Subcategory not found", 404));
        }
        resBuilder(res,true,subCategory,"subcategory found")
       } catch (error) {
        resBuilder(res,false,error,error.message)
        
       } 
    }
    static get_all_subCategorys =async(req,res)=>{
        
    }


}
module.exports =subCategory