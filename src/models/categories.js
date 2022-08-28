const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    name:{

        type:String,
        required:true,
        trim:true
     },
})

categorySchema.virtual('items',{
    ref: 'Item',
    localField: '_id',
    foreignField: 'categoryId'
});

const Category = mongoose.model('Category', categorySchema)

module.exports = Category