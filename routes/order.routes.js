const router = require('express').Router()
const orderController=require('../controllers/order.controller')
const {resBuilder}=require('../helper/app.helper')
const {auth,authUser,authAdmin}=require('../midderlware/auth.middelware')

router.post('/createorder',auth,authUser,orderController.createOrder)
//router.get('/getcheakout',auth,authUser,orderController.getCheakout)

module.exports =router