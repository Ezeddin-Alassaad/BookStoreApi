const jwt=require('jsonwebtoken')

// Verify Token
function verifyToken(req,res,next){
const token=req.headers.token

if(token){
    try{
        
const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY)
        req.user=decoded
        next()
    }
    catch(error){
        res.status(401).json({message:"invaled token"})
    }
}
else{
    res.status(401).json({message:"no token provided"})
}
}

// Verify Token and authorize the user
function verifyTokenAndAuthorization(req,res,next){
    verifyToken(req,res,()=>{
        if(req.user.id===req.params.id||req.user.isAdmin){
            next()
        }
        else{
            return res.status(403).json({ message: "Yor are not allowed"})
        }
    })
}

// Verify Token and Admin
function verifyTokenAndAdmin(req,res,next){
    verifyToken(req,res,()=>{
        if(req.user.isAdmin){
            next()
        }
        else{
            return res.status(403).json({ message: "Yor are not allowed, only the admin"})
        }
    })
}


module.exports={ verifyToken, 
verifyTokenAndAuthorization,
verifyTokenAndAdmin
}