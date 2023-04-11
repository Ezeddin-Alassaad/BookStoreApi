
const Joi=require('joi')
const bcrypt=require('bcryptjs')
const asyncHandler=require('express-async-handler')
const{ User,validateLoginUser,validateRegisterUser }=require('../models/User')
const jwt=require('jsonwebtoken')


/**
 * @desc Update User
 * @route /api/users/:id
 * @method PUT
 * @access Private
 */

const updateUser=asyncHandler(async(req,res)=>{

    const{error}=validateUpdateUser(req.body)
    if(error){ 
      return res.status(400).json({ message: error.details[0].message})
    }

    if(req.body.password){
        const salt=await bcrypt.genSalt(10)
        req.body.password=await bcrypt.hash(req.body.password, salt)
    }

    const updateUser=await User.findByIdAndUpdate(req.params.id,{
        $set:{
            email:req.body.email,
            password:req.body.password,
            username:req.body.username
        }},{ new:true }).select("-password") 

        res.status(200).json(updateUser)

})

/**
 * @desc Get All Users
 * @route /api/users
 * @method GET
 * @access Private(Only Admin)
 */

const getAllUsers=asyncHandler(async(req,res)=>{
    const users=await User.find().select("-password")
    res.status(200).json(users)
})

/**
 * @desc Get All Users
 * @route /api/users
 * @method GET
 * @access Private(Only Admin)
 */

const getUserByid=asyncHandler(async(req,res)=>{
    const users=await User.findById(req.params.id).select("-password")
    res.status(200).json(users)
})
/**
 * @desc delete User By id
 * @route /api/users/:id
 * @method delete
 * @access Private(Only Admin)
 */
const deleteUser=asyncHandler(async(req,res)=>{
    const user=await User.findById(req.params.id).select("-password")
    if(user) { 
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json({message:"User has been deleted successfully"})
     } 
    else res.status(403).json({message:"user not found"})
    })

module.exports={
    updateUser,
    getAllUsers,
    deleteUser,
    getUserByid
}