const mongoose=require('mongoose')
const validator=require('validator')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')

const userSchema =mongoose.Schema({
name:{type:String},
age:{type:Number},
email:{type:String},
password:{type:String},
userType:{type:String, enum:["admin", "user"]},
tokens:[{
    token:{type:String}
}],
myCart:[{
    product:{type: mongoose.Schema.Types.ObjectId,ref: 'Product'}, 
    quantity: { type: Number }
}],
wishList: [{product:{type: mongoose.Schema.Types.ObjectId,ref: 'Product'}}],
orders: [{type: mongoose.Schema.Types.ObjectId,ref: 'Product'}],


},
{timestamps:true})


userSchema.methods.toJSON = function(){
    const userData = this.toObject()
    delete userData.__v
    return userData
}
userSchema.pre("save", async function(){
    const userData = this
    if(userData.isModified("password"))
        userData.password = await bcrypt.hash(userData.password, 10)
})

userSchema.statics.login= async(email,password)=>{
    const userData =await User.findOne({email})
    if(!userData) throw new Error("invalid email")
    const isvalid = await bcrypt.compare(password, userData.password)
    if(!isvalid) throw new Error("invalid password")
    return userData
}

userSchema.methods.generateToken = async function(){
    const user = this
    const token = jwt.sign({_id:user._id}, process.env.JWTKEY)
    user.tokens.push({token})
    await user.save()
    return token
}

const User=mongoose.model('User',userSchema)
module.exports=User