const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config()


const userRoutes = require('./routes/user')
const morgan = require('morgan')
const bodyParser = require('body-parser')


//database
require('./config/database')
    

//middleware
app.use(morgan("dev"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended : false}))


//routing
app.use('/user', userRoutes)



const port = process.env.PORT
app.listen(port, console.log(`server started at ${port}`))






