import cartModel from '../models/Cart.js'

export const createCart = async (req, res) => {
    const newCart = new cartModel(req.body);
    try {
        const savedCart = await newCart.save();
        return res.status(200).json(savedCart);
    } catch (error) {
       return  res.status(500).json(error);
    }
}

export const updateCart = async (req, res) => {
    try {
        const updatedCart = await cartModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        return res.status(200).json(updatedCart);
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const deleteCart = async (req, res) => {
    try {
        await cartModel.findByIdAndDelete(req.params.id);
        return res.status(200).json({message: "Cart Deleted Successfully"});
    } catch (error) {
        return res.status(500).json(error);
    }
}

export const findUserCart = async (req, res) => {
    try {
        const cart = await cartModel.findOne({userID: req.params.userID});
        return res.status(200).json(cart);
    } catch (error) {
        return res.status(500).json(error);
    }
}

export const findAllCarts = async (req, res) => {
    try {
        const carts = await cartModel.find();
        res.status(200).json(carts);
    } catch (error) {
        res.status(500).json(error);
    }
}