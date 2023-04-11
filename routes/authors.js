const express=require('express')

const router=express.Router()
const Joi=require('joi')

const asyncHandler=require('express-async-handler')
const { Author }=require('../models/Author')

const { verifyToken,verifyTokenAndAdmin,verifyTokenAndAuthorization } = require('../middlewares/verifyToken')
const { getAllAuthors, getAuthorByid, creatAuthor, updateAuthor, deleteAuthor } = require('../controllers/authorsController')

router.get('/',getAllAuthors)
router.get('/:id',getAuthorByid)


router.post('/',verifyTokenAndAdmin,creatAuthor)
 router.put('/:id',verifyTokenAndAdmin,updateAuthor)

 router.delete('/:id',verifyTokenAndAdmin,deleteAuthor)

module.exports=router