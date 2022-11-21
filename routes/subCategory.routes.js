const router =require('express').Router();
const {auth,authAdmin,authUser}=require('../middelware/auth.middelware')
const subCategoryController =require('../controllers/subCategory.controller')
const uploadImgProduct =require('../middelware/uploadImgProduct.middleware')


router.post('/createSubCategory/:categoryId',auth,authAdmin,uploadImgProduct.single('img'),subCategoryController.create_subCategory)
router.patch('/edit_subCategory',auth,authAdmin,subCategoryController.edit_subCategory)
router.get('/get_subCategory/:id',auth,authAdmin,subCategoryController.get_subCategory)
router.get('/get_all_subCategorys',auth,subCategoryController.get_all_subCategorys)
router.delete('/delete_subCategory',auth,authAdmin,subCategoryController.delete_subCategory)



module.exports=router