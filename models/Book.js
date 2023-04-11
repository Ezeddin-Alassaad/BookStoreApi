const mongoose=require('mongoose')
const Joi=require('joi')

const BookSchema=new mongoose.Schema({
    
    title:{
        type:String,
        required:true,
        minlength:3,
        maxlength:200,
        trim:true
    },        
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref: "Author",
    },
    description:{
        trim:true,
        type: String,
        required:true,
        minlength:3,
    },
    price: {
        type: Number,
        required:true,
        min:0
        },
    cover: {
        type:String,
        required:true,
        enum : [ "Soft Cover", "Hard Cover"]
    } 
})


function validateUpdateBook(obj){
    const schema=Joi.object({
        title: Joi.string().trim().min(3).max(100),
        author: Joi.string(),
        description: Joi.string().trim().min(3),
        price: Joi.number().min(0),
        cover:Joi.string().valid("Soft Cover", "Hard Cover")
    })
    return schema.validate(obj)
}
function validateCreatBook(obj){
    const schema=Joi.object({
        title: Joi.string().trim().min(3).max(100).required(),
        author: Joi.string().required(),
        description: Joi.string().min(3).trim().required(),
        price: Joi.number().min(0).required(),
        cover:Joi.string().valid("Soft Cover", "Hard Cover").required()
    })
    return schema.validate(obj)
}

const Book=mongoose.model("Book", BookSchema)

module.exports={
    Book,
    validateCreatBook,
    validateUpdateBook
}