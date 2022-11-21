const {resBuilder} = require("../helper/app.helper")
const userModel =require('../models/user.model')
const bcrypt=require('bcryptjs')
const sendEmail=require('../middelware/sendEmail')

class User{

static register_user =async(req,res,next)=>{
    try {
        const userData=new userModel(req.body);
        userData.userType="user"
        const savedUser= await userData.save();
        const token = savedUser.getEmailJwtToken();
        const url = `${req.protocol}://${req.get("host" )}/api/v1/auth/confirm-email/${token}`;
        const message = `<p>Use this email to verify your email</p><br><a href='${url}'>Verify Email</a>`;
        sendEmail(savedUser.email, message, "Verify Email");
        
        resBuilder(res,true, userData, "user register")
    } catch (error) {
        resBuilder(res,false, error, "user not register")

            }
}
static login_user =async(req,res)=>{
    try {
        const userData =await userModel.login(req.body.email,req.body.password)
       // console.log(userData)
        const token = await userData.generateToken()
        //console.log(token)
        resBuilder(res,true, {userData,token}, "user login")

    } catch (error) {
        resBuilder(res,false, error, "user not login")

    }
}
static log_out = async(req,res,next)=>{
    try {
        req.user.tokens =req.user.tokens.filter(t=>t.token != req.tokens
                        )
                        req.user.save();
        resBuilder(res,true,[],"user log out")
            } catch (error) {
        resBuilder(res,false,error,error.message)
    }
}
static me = async(req,res)=>{
 try {
    const me = req.user.token

       resBuilder(res,true,me,"user")
   
 } catch (error) {
    resBuilder(res,false,error,error.message)

    
 }}
 static edit_user = async(req,res)=>{
    try {
        const Data=req.body
        const userId=req.user._id
        const profile= await userModel.findById(userId)
        for(const key in Data){
            profile[key]=Data[key]
        }
        profile.save()
        resBuilder(res,true,profile,"user profile")

    } catch (error) {
        resBuilder(res,false,error,error.message)

    }

 }
 static edit_user_email =async(req,res)=>{
    try {
        //const newEmail=req.body.email
        //const User=req.user
        //if(key in User)
        //req.user[email]=User[newEmail]

        //User.email=newEmail
        //User.save();
        //resBuilder(res,true,User,"email is change")
    } catch (error) {

        resBuilder(res,false,error,error.message)
    }
}
 static edit_user_password = async(req,res)=>{
    try {
        const newPasswrod=req.body.password
        const User =req.user 
        const cPass=await bcrypt.compare(newPasswrod,User.password)
        User.password=newPasswrod
        User.save();
        resBuilder(res,true,User,"password is change")

    } catch (error) {
        resBuilder(res,false,error,error.message)
    }
 }
 static delete_User =async(req,res)=>{
    try {
        const userId = req.user.id
        const userfound = await userModel.findOneAndRemove(userId)

        
        resBuilder(res,true,userfound ,"user is deleted")
        
    } catch (error) {
        resBuilder(res,false,error,error.message)        
    }
 }

 

}

module.exports =User