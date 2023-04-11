const mongoose=require('mongoose')
const Joi=require('joi')

const AuthorSchema=new mongoose.Schema({
    FirstName:{
        type:String,
        required: true,
        trim: true,
        minlength:3,
        maxlength:100
    },
    LastName:{
        type:String,
        required: true,
        trim: true,
        minlength:3,
        maxlength:100
    },
    Nationality:{
        type:String,
        required: true,
        trim: true,
        minlength:3,
        maxlength:100
    }
},
{timestamps:true }
)



const Author=mongoose.model("Author", AuthorSchema)

module.exports={
    Author
}