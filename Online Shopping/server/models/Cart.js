import mongoose from "mongoose";

const cartSchema = mongoose.Schema({
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
    ]
});

const cartModel = mongoose.model("Cart", cartSchema);
export default cartModel;