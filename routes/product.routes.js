const router = require('express').Router()
const productController =require('../controllers/product.controller')
const {auth,authAdmin,authUser} =require('../middelware/auth.middelware')
const uploadImgProduct =require('../middelware/uploadImgProduct.middleware')


router.post('/addproduct',auth,uploadImgProduct.single('img'),productController.add_product)
router.delete('/deleteProduct/:id',auth,authAdmin,productController.delete_product)
router.get('/productview/:id',auth,productController.view_product)
router.get('/productsview',productController.view_all_product)
router.patch('/editproduct/:id',productController.edit_product)
router.post('/addtocart/:id',auth,authUser,productController.add_To_Cart)
router.delete('/delfromcart/:id',auth,authUser,productController.del_from_cart)
router.get('/cart/:id',auth,authUser,productController.getCart)
router.post('/addtowhatlist/:id',auth,authUser,productController.add_to_whatlist)
router.delete('/removeFromWhishlist/:id',auth,authUser,productController.removeFromWhishlist)


module.exports =router