const router =require('express').Router()
const userController =require('../controllers/user.controller')
const {auth, authAdmin, authUser} =require('../middelware/auth.middelware')
const uploadPfrfile =require('../middelware/uploadProfileUser.middleware')

router.post('/login',userController.login_user)
router.post('/registerUser',userController.register_user)
router.post('/logout',auth,userController.log_out)
router.patch('/edituser',auth,userController.edit_user)
router.patch('/edituserpassword',auth,userController.edit_user_password)
router.patch('/edituseremail',auth,userController.edit_user_email)
router.delete('/deleteuser/:id',auth,userController.delete_User)



module.exports=router