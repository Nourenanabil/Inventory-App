const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = new mongoose.Schema({
   
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        lowercase:true,
        validate(value){
            if (!validator.isEmail(value)){

                throw new Error("Error: in valid email")
            }

    }},
    encryptedPassword:{
        type: String,
        required: true

    },
    role:{

        type: String, 
        enum: ['admin', 'restricted'], 
        required: true
    }
})

const User = mongoose.model('User',userSchema)
module.exports = User;