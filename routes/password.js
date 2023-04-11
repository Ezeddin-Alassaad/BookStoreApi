const express=require('express')
const  {getForgotPasswordView, sendForgotPasswordLink, getResetPasswordView, resetThePassword}  = require('../controllers/passwordController')


const router=express.Router()
// password/forgot-password
router.route('/forgot-password')
.get(getForgotPasswordView)
.post(sendForgotPasswordLink)
// password/reset-password/:userId/:token
router.get('/reset-password/:userId/:token',getResetPasswordView)
router.post('/reset-password/:userId/:token',resetThePassword)
module.exports=router