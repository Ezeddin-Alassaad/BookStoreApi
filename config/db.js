const mongoose=require('mongoose')

async function connectToDB(){
    try{
 await mongoose.connect(process.env.MONGO_URI)
 console.log("Connected to mongodb")
}
catch(err){console.log("connection Failled",err) }
}

module.exports=connectToDB