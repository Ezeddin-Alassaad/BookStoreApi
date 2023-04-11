const express=require('express')
const Joi=require('joi')

const router=express.Router()

const { verifyToken,verifyTokenAndAdmin,verifyTokenAndAuthorization } = require('../middlewares/verifyToken')
const { getAllBooks,getBookById,createNewBook,updateBook,deleteBook }= require('../controllers/bookController')
router.route("/")
.get(getAllBooks)
.post(verifyTokenAndAdmin,createNewBook)

router.route('/:id')
.get(getBookById)
.put(verifyTokenAndAdmin,updateBook)
.delete(verifyTokenAndAdmin,deleteBook)

module.exports=router