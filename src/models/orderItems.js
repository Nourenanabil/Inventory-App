const mongoose = require('mongoose')

const orderItemsSchema = new mongoose.Schema({
    quantity:{
        type:Number,
        required:true,
        trim:true,
    },
    pricePerItem:{
        type:mongoose.Types.Decimal128,
        required:true,
        trim:true
    },
    itemId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Item'
    },
    orderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Order'
    }
})

const OrderItems = mongoose.model('OrderItems',orderItemsSchema) 
module.exports = OrderItems;