import * as mongoose from 'mongoose';
import validator from 'validator';

export interface Iuser {
    
    email: string;
    encryptedPassword: string;
    role: string;
}

const userSchema = new mongoose.Schema <Iuser> ({

    email: {

        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,

        validate(value) {

            if (!validator.isEmail(value)) {

                throw new Error("Error: in valid email")
            }

        }
    },
    encryptedPassword: {

        type: String,
        required: true

    },
    role: {

        type: String,
        enum: ['admin', 'restricted'],
        required: true
    }
})

export const User = mongoose.model <Iuser> ('User', userSchema)
// module.exports = User;