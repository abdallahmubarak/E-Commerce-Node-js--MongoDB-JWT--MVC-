const router=require('express').Router()
const {auth,authAdmin,authUser}=require('../midderlware/auth.middelware')
const adminController =require('../controllers/admin.controller')

router.post('/registerAdmin',adminController.register_Admin)

module.exports=router