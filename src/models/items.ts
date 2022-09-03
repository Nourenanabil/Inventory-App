import * as mongoose from 'mongoose';

export interface Iitems {

    name : string;
    categoryId : mongoose.Schema.Types.ObjectId;
}

const itemSchema = new mongoose.Schema <Iitems> ({
    name: {
        
        type: String,
        require: true,
        trim: true,

    },
    categoryId: {

        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Category'
    }
})



export const Item = mongoose.model <Iitems> ('Item', itemSchema)

