const asyncHandler=require('express-async-handler')
const {User}=require('../models/User')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const nodemailer=require('nodemailer')
/**
 * @desc Get Forgot Password View
 * @route /password/forgot-password/:userId/:token
 * @method GET
 * @access public
 */

module.exports.getForgotPasswordView=asyncHandler((req,res)=>{
res.render('forgot-password')
})


/**
 * @desc Send Forgot Password Link
 * @route /password/forgot-password
 * @method POST
 * @access public
 */

module.exports.sendForgotPasswordLink=asyncHandler(async(req,res)=>{
const user=await User.findOne({email:req.body.email})
if(!user){
    return res.status(404).json({Message:"user not found"})
}
const secret=process.env.JWT_SECRET_KEY+user.password
const token=jwt.sign({email:user.email, id:user.id},secret,{
    expiresIn:'1000m'
})
const link=`http://localhost:5000/password/reset-password/${user._id}/${token}`;
const transporter=nodemailer.createTransport({
    service:"gmail",
    auth:{
    user:Process.env.USER_EMAIL,
    pass:process.env.USER_PASS
    }
})
const mailOptions={
    from:Process.env.USER_EMAIL,
    to:user.email,
    subject:"Reset Password",
    html:`<div> <h4>Click on the link below to reset your password</h4>
    <P>${link}</p>
    <div/>`
}
transporter.sendMail(mailOptions,function(error,success){
    if(error){
        console.log(error)
    }
    else{
        console.log("Email sent: "+success.response)
    }
})
res.render('link-send')

// const message = 'Click on the link';
// const html = `<a href="${link}">${message}</a>`;
// res.send(html);
// const link=`http://localhost:5000/password/reset-password/${user._id}/${token}`;
// console.log(link);
// res.json({Message:'Click on the link', ResetPasswordLink: link})
})


/**
 * @desc Get Reset Password View
 * @route /password/reset-password/:userId/:token
 * @method GET
 * @access public
 */

module.exports.getResetPasswordView=asyncHandler(async(req,res)=>{
const user=await User.findById(req.params.userId)
if(!user){
    return res.status(404).json({Message:"user not found"})
}
const secret=process.env.JWT_SECRET_KEY+user.password
try {
    jwt.verify(req.params.token,secret)
    res.render('reset-password',{email:user.email})
} catch (error) {
    console.log(error);
    res.json({message:"Error"})
}
})

/**
 * @desc Reset Password 
 * @route /password/forgot-password/:userId/:token
 * @method POST
 * @access public
 */

module.exports.resetThePassword = asyncHandler(async (req, res) => {
// TODO Validation
const user = await User.findById(req.params.userId);
if (!user) {
    return res.status(404).json({ Message: 'user not found' });
}
const secret = process.env.JWT_SECRET_KEY + user.password;
try {
    jwt.verify(req.params.token, secret);
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
    user.password = req.body.password;
    await user.save();
    res.render('success-password');
} catch (error) {
    console.log(error);
    res.json({ message: 'Error' });
}
})