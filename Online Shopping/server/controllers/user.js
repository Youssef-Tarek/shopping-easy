import bcrypt from 'bcrypt';

import userModel from '../models/user.js';

export const updateUser = async (req, res) => {
    try {
        if(req.body.password){
            req.body.password = await bcrypt.hash(req.body.password, 12);
        }
        const updatedUser = await userModel.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true});
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json(error);     
    }
}

export const deleteUser = async (req, res) => {
    try {
        await userModel.findByIdAndDelete(req.body.id);
        res.status(200).json({message: "User has been deleted"});
    } catch (error) {
        res.status(500).json(error);     
    }
}

export const findUser = async (req, res) => {
    try {
        const user = await userModel.findById(req.params.id);
        const { password, ...other} = user._doc;
        res.status(200).json(other);
    } catch (error) {
        res.status(400).json(error);
    }
}

export const findAllUsers = async (req, res) => {
    const query = req.query.new;
    try {
        const users = query? await userModel.find().sort({_id: -1}).limit(5) : await userModel.find();  
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json(error);
    }
}

export const userStats = async (req, res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
    try {
        const data = await userModel.aggregate([
           { $match: {createdAt: {$gte: lastYear}} },
           { $project: {month: {$month: "$createdAt"}} },
           { $group: {_id: "$month", total: {$sum: 1}} }   
        ]);
        res.status(200).json(data);
    } catch (error) {
        console.log("Error");
        res.status(500).json(error);
    }
}