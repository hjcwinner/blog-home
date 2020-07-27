const express = require('express')
const app = express()
const mongoose = require('mongoose')


const userRoutes = require('./routes/user')
const morgan = require('morgan')
const bodyParser = require('body-parser')


//database
const MONGODB_URI = "mongodb+srv://blog:hjc8056107@cluster0.smqqa.mongodb.net/blog?retryWrites=true&w=majority"

mongoose
    .connect(MONGODB_URI, { useNewUrlParser: true , useUnifiedTopology: true })
    .then(() => console.log("server start"))
    .catch((err) => console.log(err.message))

//middleware
app.use(morgan("dev"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended : false}))


//routing
app.use('/user', userRoutes)



const port = 8080
app.listen(port, console.log(`server started at ${port}`))






