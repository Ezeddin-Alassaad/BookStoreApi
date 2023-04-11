
const Joi=require('joi')
const bcrypt=require('bcryptjs')
const asyncHandler=require('express-async-handler')
const{ User,validateLoginUser,validateRegisterUser }=require('../models/User')
const jwt=require('jsonwebtoken')

/**
 * @desc Register New User
 * @route /api/auth/register
 * @method POST
 * @access public
 */

const register=asyncHandler(async(req,res)=>{
    const { error }=validateRegisterUser(req.body)
    if(error){
        res.status(400).json({ message: error.details[0].message })
    }
    let user= await User.findOne({email:req.body.email})
    if(user){
        return res.status(400).json({ message: "This User Alerady Registered"})
    }
    const salt=await bcrypt.genSalt(10)
    req.body.password=await bcrypt.hash(req.body.password, salt)

    user=new User({
        email:req.body.email,
        username:req.body.username,
        password:req.body.password,
    })
    const token=user.genrateToken()

    const result=await user.save()
    const { password, ...other }=result._doc

    res.status(201).json({...other, token})

})

/**
 * @desc Login User
 * @route /api/auth/login
 * @method POST
 * @access public
 */
const login=asyncHandler(async(req,res)=>{
    const { error }=validateLoginUser(req.body)
    if(error){
        res.status(400).json({ message: error.details[0].message })
    }
    let user= await User.findOne({email:req.body.email})
    if(!user){
        return res.status(400).json({ message: "Invalid email or Password"})
    }
    const isPassword=await bcrypt.compare(req.body.password,user.password)
    
    
    if(!isPassword){
        return res.status(400).json({ message: "Invalid email or Password"})
    }

    const token=user.genrateToken()

    const { password, ...other }=user._doc

    res.status(200).json({...other, token})

})


module.exports={
    register,
    login
}