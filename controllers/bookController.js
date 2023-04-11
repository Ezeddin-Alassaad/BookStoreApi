const asyncHandler=require('express-async-handler')
const { Book,validateCreatBook,validateUpdateBook }=require('../models/Book')

/**
 * @desc Get All books
 * @route /api/books
 * @method GET
 * @access public
 */


const getAllBooks=asyncHandler(async(req,res)=>{
    const { minPrice,maxPrice }=req.query
    let books
    if(minPrice&&maxPrice){
    books=await Book.find({ price:{$lte:maxPrice,$gte:minPrice}}).
    populate("author",["_id","FirstName","LastName"])
    }
    else{
    books=await Book.find().
    populate("author",["_id","FirstName","LastName"])
    }
    res.status(200).json(books)
})


/**
 * @desc    Get book By Id
 * @route   /api/books/:id
 * @method  GET
 * @access  public
 */
const getBookById=asyncHandler(async(req,res)=>{
    const book=await Book.findById(req.params.id).populate("author")
    if(book){
        res.status(200).json(book)
    }
    else{
        res.status(404).json({ message: "Book Not Found"})
    }
})


/**
 * @desc Create New Object 'Book'
 * @route /api/books
 * @method POST
 * @access private
 */
const createNewBook=asyncHandler(async(req,res)=>{
    const { error }=validateCreatBook(req.body)
    if(error) return res.status(400).json({ message: error.details[0].message})
    const book=new Book({
        title:req.body.title,
        author:req.body.author,
        description:req.body.description,
        price: req.body.price,
        cover: req.body.cover
    })
    const result=await book.save()
    res.status(201).json(result) 
}) 

/**
 * @desc Update a 'Book'
 * @route /api/books/:id
 * @method PUT
 * @access private
 */

const updateBook=asyncHandler(async(req,res)=>{

    const { error }=validateUpdateBook(req.body)
    if(error) return res.status(400).json({ message: error.details[0].message})

    const updatedBook=await Book.findByIdAndUpdate(req.params.id,{
        $set:{
                title:req.body.title,
                author:req.body.author,
                description:req.body.description,
                price: req.body.price,
                cover: req.body.cover
                }
    },{ new: true })
    res.status(200).json(updatedBook)
})

/**
 * @desc Delete a 'Book'
 * @route /api/books/:id
 * @method delete
 * @access private
 */
const deleteBook=asyncHandler(async(req,res)=>{
    const book=await Book.findById(req.params.id)
    if(book){ 
        await Book.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: "Boook has been Deleted"}) }
    else res.status(404).json({ message: "Book Not Found"})
})
module.exports={ 
    getAllBooks,
    getBookById,
    createNewBook,
    updateBook,
    deleteBook
}