import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
    userID: {
        type: String,
        require: true
    },
    products: [
        {
            productID: {
                type: String
            },
            quantity: {
                type: Number,
                default: 1
            }
        }
    ],
    amount: {
        type: Number,
        required: true
    },
    address: {
        type: Object,
        required: true
    },
    status: {
        type: String,
        default: "Pending"
    }
}, {timestamps: true});

const orderModel = mongoose.model("Order", orderSchema);
export default orderModel;