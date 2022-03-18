import productModel from '../models/Product.js'

export const createProduct = async (req, res) => {
    const newProduct = new productModel(req.body);
    try {
        const savedProduct = await newProduct.save();
        return res.status(200).json(savedProduct);
    } catch (error) {
       return  res.status(500).json(error);
    }
}

export const updateProduct = async (req, res) => {
    try {
        const updatedProduct = await productModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        return res.status(200).json(updatedProduct);
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const deleteProduct = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.params.id);
        return res.status(200).json({message: "Product Deleted Successfully"});
    } catch (error) {
        return res.status(500).json(error);
    }
}

export const findProduct = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.id);
        return res.status(200).json(product);
    } catch (error) {
        return res.status(500).json(error);
    }
}

export const findProducts = async (req, res) => {
    try {

        let products;
        if (req.query.new) {
            products = await productModel.find().sort({ createdAt: -1 }).limit(5);
        } else if (req.query.category) {
            products = await productModel.find({ categories: {$in: [req.query.category]}});
        } else {
            products = await productModel.find();
        }
        return res.status(200).json(products);
    } catch (error) {
        return res.status(500).json(error);
    }
}