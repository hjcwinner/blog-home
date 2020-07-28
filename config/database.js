const mongoose = require('mongoose')

mg_Option = {
    useNewUrlParser: true, 
    useUnifiedTopology: true
}

mongoose
.connect(process.env.MONGODB_URI, mg_Option)
.then(() => console.log('mongodb connected...'))
.catch(err => console.log(err.message))