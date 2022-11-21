const router =require('express').Router();
const categoryController=require('../controllers/category.controller');
const {auth,authAdmin,authUser} =require('../middelware/auth.middelware');
const uploadImgProduct =require('../middelware/uploadImgProduct.middleware')



router.post('/create_Category',auth,authAdmin,auth,uploadImgProduct.single('img'),categoryController.create_Category)
router.delete('/deleteCategory/:categoryId',auth,authAdmin,categoryController.delete_Category)
router.patch('/edit_Category/:categoryId',auth,authAdmin,categoryController.edit_Category)
router.get('/allCategories',auth,categoryController.allCategories)
router.get('/view_Category/:categoryId',auth,categoryController.view_Category)


module.exports = router