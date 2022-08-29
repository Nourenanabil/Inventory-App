const mongoose = require('mongoose')
require('dotenv').config()

console.log(process.env.mongoDb_URL)
mongoose.connect(process.env.mongoDb_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
    
}).then(() => console.log('MongoDB connection established.'))
.catch((error) => console.error("MongoDB connection failed:", error.message))

