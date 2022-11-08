const categoryModel =require('../models/category.model')
const SubCategoryModel =require('../models/subCategory.model')
const {resBuilder} =require('../helper/app.helper')
class Category{
    static create_Category =async(req,res)=>{
        try {
                 const category =new categoryModel(req.body)
                 category.save();
                 resBuilder(res,true,category,"category created")

   
        } catch (error) {
            resBuilder(res,false,error,"category not created")
        }
    }
    static edit_Category =async(req,res)=>{
        const categoryId=req.params.categoryId
        const category =await categoryModel.findById(categoryId)
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    }
    static delete_Category =async(req,res)=>{
        try {
           const categoryId =req.params.categoryId
        const category =await categoryModel.findById(categoryId)
        if (!category) throw new Error("Category not found")
        const deleteCategory = await categoryModel.findByIdAndRemove(req.params.categoryId)
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //const subcategories = await SubCategoryModel.deleteMany({
          //  category: category._id,
          //});
          resBuilder(res,true,deleteCategory,"category deleted")
        } catch (error) {
            resBuilder(res,false,error,error.message)

        }
    }
    static view_Category =async(req,res)=>{
        try {
            const category_id =req.params.id
            const category =await categoryModel.findById(category_id)

            resBuilder(res,true,category,'category view')
       
        } catch (error) {
            resBuilder(res,true,error,error.message)

        }

    }
    static allCategories=async(req,res)=>{
        try {
            const categorys =await categoryModel.find()
        resBuilder(res,true,categorys,'category view')

        } catch (error) {
            resBuilder(res,true,error,error.message)

        }


    }



}
module.exports =Category