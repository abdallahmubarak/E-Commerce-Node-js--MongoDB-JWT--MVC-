const router = require('express').Router()
const orderController=require('../controllers/order.controller')
const {resBuilder}=require('../helper/app.helper')
const {auth,authUser,authAdmin}=require('../middelware/auth.middelware')

router.post('/createorder',auth,authUser,orderController.createOrder)
router.get('/totalprice',auth,authUser,orderController.totalPrice)
router.get('/order/:orderId',auth,authUser,orderController.getOrder)
router.get('/myorders',auth,authUser,orderController.getMyOrders)
router.post('/processorder/:orderId',auth,authUser,orderController.processOrder)



module.exports =router