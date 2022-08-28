const mongoose = require('mongoose')
const validator = require('validator')

const vendorSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim :true
    },
    email:{
        type:String,
        unique:true,
        required:true,
        trim:true,
        lowercase:true,
        validate(value){
            if (!validator.isEmail(value)){

                throw new Error("Error: in valid email")
            }
        }
    }
})

vendorSchema.virtual('orders',{
    ref: 'Order',
    localField: '_id',
    foreignField: 'vendorId'
});

const Vendor = mongoose.model('Vendor',vendorSchema)

module.exports = Vendor