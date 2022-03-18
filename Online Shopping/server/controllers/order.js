import orderModel from '../models/Order.js'

export const createOrder = async (req, res) => {
    const newOrder = new orderModel(req.body);
    try {
        const SavedOrder = await newOrder.save();
        return res.status(200).json(SavedOrder);
    } catch (error) {
       return  res.status(500).json(error);
    }
}

export const updateOrder = async (req, res) => {
    try {
        const updatedOrder = await orderModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        return res.status(200).json(updateOrder);
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const deleteOrder = async (req, res) => {
    try {
        await orderModel.findByIdAndDelete(req.params.id);
        return res.status(200).json({message: "Product Deleted Successfully"});
    } catch (error) {
        return res.status(500).json(error);
    }
}

export const findOrder = async (req, res) => {
    try {
        const orders = await orderModel.find({userID: req.params.userID});
        return res.status(200).json(orders);
    } catch (error) {
        return res.status(500).json(error);
    }
}

export const findAllOrders = async (req, res) => {
    try {
        const orders = await orderModel.find();
        return res.status(200).json(orders);
    } catch (error) {
        return res.status(500).json(error);
    }
}

export const monthlyIncome = async (req, res) => {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
    try {
        const income = await orderModel.aggregate([
            { $match: { createdAt: {$gte: previousMonth}}},
            { $project: {month: {$month: "$createdAt"}, sales: "$amount"}},
            { $group: {_id: "$month", total: {$sum: "$sales"}}}        
        ])
        return res.status(200).json(income);
    } catch (error) {
        res.status(500).json(error);
    }
}