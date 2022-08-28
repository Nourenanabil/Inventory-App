const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true,
        trim:true,

    },
    categoryId:{

    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:'Category'
}
})

itemSchema.virtual('orders',{
    ref: 'OrderItems',
    localField: '_id',
    foreignField: 'itemId'
});

const Item = mongoose.model('Item',itemSchema)

module.exports = Item;