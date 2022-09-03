import * as mongoose from 'mongoose';

export interface Icategory {

    name : string
}

const categorySchema = new mongoose.Schema <Icategory> ({
    name: {

        type: String,
        required: true,
        trim: true
    },
})


export const Category = mongoose.model <Icategory> ('Category', categorySchema)

