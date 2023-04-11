const mongoose=require('mongoose')
const Joi=require('joi')
const jwt=require('jsonwebtoken')
const userSchema=new mongoose.Schema({
  email:{
    type:String,
    required: true,
    trim: true,
    minlength:3,
    maxlength:100,
    unique:true
  },
  username:{
    type:String,
    required: true,
    trim: true,
    minlength:3,
    maxlength:100,    
  },
  password:{
    type:String,
    required: true,
    trim:true,
    minlength:3
  },
  isAdmin:{
    type:Boolean,
    default:false
  } },

{ trimestamps:true })

userSchema.methods.genrateToken=function(){
  return jwt.sign({ id:this._id, isAdmin:this.isAdmin},process.env.JWT_SECRET_KEY)
}
const User=mongoose.model("User",userSchema)

// Validate user function

function validateRegisterUser(obj){
    const schema=Joi.object({
        email: Joi.string().trim().min(3).max(100).required().email(),
        username: Joi.string().trim().min(3).max(100).required(),
        password: Joi.string().trim().min(3).max(100).required(),
    })
    return schema.validate(obj)
}
 // validate Login User
 function validateLoginUser(obj){
     const schema=Joi.object({
         email: Joi.string().trim().min(3).max(100).required().email(),
         password: Joi.string().trim().min(3).max(100).required()
     }) 
     return schema.validate(obj)
 }

// validate Update User
 function validateUpdateUser(obj){
    const schema=Joi.object({
         email: Joi.string().trim().min(3).max(100).email(),
         username: Joi.string().trim().min(3).max(100),
         password: Joi.string().trim().min(3).max(100),       
     }) 
     return schema.validate(obj)
} 

module.exports={
    User,validateLoginUser,validateRegisterUser,validateUpdateUser
}