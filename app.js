const express=require('express')
const Joi=require('joi')

const app=express()
const mongoose=require('mongoose')

const logger=require('./middlewares/logger')
const { notFound,errorHandler }=require('./middlewares/error')
require('dotenv').config()
const connectToDB = require('./config/db')

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.set('view engine','ejs')
connectToDB()
app.use(logger)


app.use('/api/books',require('./routes/books'))

app.use('/api/authors',require('./routes/authors'))

app.use('/api/auth',require('./routes/auth'))
app.use('/api/users',require('./routes/users'))
app.use('/password',require('./routes/password'))

//Error Handler
app.use(notFound)
app.use(errorHandler)

const PORT=process.env.PORT
app.listen(PORT,()=> console.log(`listen in ${process.env.NODE_ENV} to 5000`))