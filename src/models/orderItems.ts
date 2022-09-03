
import * as mongoose from 'mongoose';


export interface IorderItems {

    quantity: Number;
    pricePerItem: Number;
    itemId: mongoose.Schema.Types.ObjectId;
    orderId: mongoose.Schema.Types.ObjectId;
}

const orderItemsSchema = new mongoose.Schema <IorderItems> ({
    quantity: {

        type: Number,
        required: true,
        trim: true,
    },
    pricePerItem: {

        type: Number,
        required: true,
        trim: true
    },
    itemId: {

        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Item',
    },
    orderId: {

        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    }
})

export const OrderItems = mongoose.model <IorderItems> ('OrderItems', orderItemsSchema)
// module.exports = OrderItems;