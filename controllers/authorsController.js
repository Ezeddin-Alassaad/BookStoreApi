const Joi=require('joi')

const asyncHandler=require('express-async-handler')
const { Author }=require('../models/Author')

const { verifyToken,verifyTokenAndAdmin,verifyTokenAndAuthorization } = require('../middlewares/verifyToken')


/**
 * @desc Get All Authors
 * @route /api/books/
 * @method GET
 * @access private
 */
const getAllAuthors=asyncHandler(
    async(req,res)=>{
        const {pageNumber}=req.query
    const authorsPerPage=2
    const authorList=await Author.find().skip((pageNumber-1)*authorsPerPage).limit(authorsPerPage)
    res.status(200).json(authorList)
    }
    )

/**
 * @desc Get Author By id
 * @route /api/books/
 * @method GET
 * @access private
 */
const getAuthorByid=asyncHandler(
    async(req,res)=>{
            const author=await Author.findById(req.params.id)
            if(author){ res.status(200).json(author) }
            
            else{
                res.status(404).json({ message: "Name Not Found"})
            
            }}        
)

/**
 * @desc Create a 'Authore'
 * @route /api/books
 * @method PUT
 * @access private
 */

const creatAuthor=asyncHandler(
    async(req,res)=>{
        const { error }=validateCreatAuthore(req.body)
        if(error) return res.status(400).json({ message: error.details[0].message})
        const author=new Author(
            {
                FirstName:req.body.FirstName,
                LastName:req.body.LastName,
                Nationality:req.body.Nationality,
            }
         )
        const result=await author.save()
        res.status(201).json(result) // 201=> created successfully
        }
)

/**
 * @desc Update a 'Authore'
 * @route /api/books/:id
 * @method PUT
 * @access private
 */
const updateAuthor=asyncHandler(
    async(req,res)=>{

        const { error }=validateUpdateAuthore(req.body)
        if(error) return res.status(400).json({ message: error.details[0].message})
    
            const author=await Author.findByIdAndUpdate(req.params.id,{
            $set:{
                FirstName: req.body.FirstName,
                LastName: req.body.LastName,
                Nationality: req.body.Nationality
            }
        },{ new:true })
        res.status(200).json(author)
    }     
 )
 /**
 * @desc Delete a 'Authore'
 * @route /api/books/:id
 * @method PUT
 * @access private
 */
const deleteAuthor=asyncHandler(async(req,res)=>{
    
    const author=await Author.findById(req.params.id)
    if(author){ 
        await Author.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: "Authore has been Deleted"}) }
    else res.status(404).json({ message: "Authore Not Found"})
    }
    )    

    function validateUpdateAuthore(obj){
        const schema=Joi.object({
            FirstName: Joi.string().trim().min(3).max(100),
            LastName: Joi.string().trim().min(3).max(100),
            Nationality: Joi.string().trim().min(3).max(100),
        })
        return schema.validate(obj)
    }
    
    function validateCreatAuthore(obj){
        const schema=Joi.object({
            FirstName: Joi.string().trim().min(3).max(100),
            LastName: Joi.string().trim().min(3).max(100),
            Nationality: Joi.string().trim().min(3).max(100),
    
        })
        return schema.validate(obj)
    }
    
    
    module.exports={
        getAllAuthors,
        getAuthorByid,
        creatAuthor,
        updateAuthor,
        deleteAuthor
    }