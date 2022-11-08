const userModel =require('../models/user.model')
const {resBuilder} =require('../helper/app.helper')
class Admin{
    static register_Admin =async(req,res)=>{
        try {
         const adminData =new userModel(req.body)
         adminData.userType="admin"
         await adminData.save()
         resBuilder(res,true, adminData, "admin register")
     
        } catch (error) {
         resBuilder(res,false, error, error.message)
     
        }
        }
    }
module.exports = Admin    