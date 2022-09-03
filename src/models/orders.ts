import * as mongoose from 'mongoose';

export interface Iorders {

    vendorId : mongoose.Schema.Types.ObjectId;
}

const orderSchema = new mongoose.Schema <Iorders> ({
    
    vendorId: {

        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Vendor'
    }
})


export const Order = mongoose.model <Iorders> ('Order', orderSchema)

// module.exports = Order;