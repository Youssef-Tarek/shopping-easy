import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true
    },
    categories: {
        type: [String],
        required: true
    },
    size: {
        type: String,
    },
    color: {
        type: String,
    },
    price: {
        type: Number,
        required: true
    }
}, {timestamps: true});

const productModel = mongoose.model("Product", productSchema);
export default productModel;