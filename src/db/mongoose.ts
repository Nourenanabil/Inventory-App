import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

mongoose.connect(`${process.env.mongoDb_URL}`)
    .then(() => console.log('MongoDB connection established.'))
    .catch((error) => console.error("MongoDB connection failed:", error.message))

