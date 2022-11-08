const router =require('express').Router();
const categoryController=require('../controllers/category.controller');
const {auth,authAdmin,authUser} =require('../midderlware/auth.middelware');

router.post('/create_Category',auth,authAdmin,categoryController.create_Category)
router.delete('/deleteCategory/:categoryId',auth,authAdmin,categoryController.delete_Category)
router.patch('/edit_Category/:categoryId',auth,authAdmin,categoryController.edit_Category)
router.get('/allCategories',auth,categoryController.allCategories)
router.get('/view_Category/:categoryId',auth,categoryController.view_Category)

module.exports = router