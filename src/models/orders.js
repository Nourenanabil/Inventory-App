const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    vendorId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Vendor'    }
})

orderSchema.virtual('items',{
    ref: 'OrderItems',
    localField: '_id',
    foreignField: 'orderId'
});
const Order = mongoose.model('Order',orderSchema)

module.exports=Order;