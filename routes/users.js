const express=require('express')

const router=express.Router()
const bcrypt=require('bcryptjs')
const asyncHandler=require('express-async-handler')
const { verifyToken,verifyTokenAndAdmin,verifyTokenAndAuthorization } = require('../middlewares/verifyToken')
const { getUserByid, getAllUsers, updateUser, deleteUser } = require('../controllers/usersControllers')
const { getAllAuthors } = require('../controllers/authorsController')

router.put('/:id',verifyTokenAndAuthorization,updateUser)


 router.get('/',verifyTokenAndAdmin,getAllUsers)


 router.get('/:id',verifyTokenAndAuthorization,getUserByid)


 router.delete('/:id',verifyTokenAndAuthorization,deleteUser)


module.exports=router