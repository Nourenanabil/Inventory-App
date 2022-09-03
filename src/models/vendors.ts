import * as mongoose from 'mongoose';
import validator from 'validator';


export interface Ivendor {

    name: String;
    email: String;
}

const vendorSchema = new mongoose.Schema <Ivendor> ({
    name: {

        type: String,
        required: true,
        trim: true
    },
    email: {

        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,

        validate(value) {

            if (!validator.isEmail(value)) {

                throw new Error("Error: in valid email")
            }
        }
    }
})



export const Vendor = mongoose.model <Ivendor> ('Vendor', vendorSchema)

// module.exports = Vendor