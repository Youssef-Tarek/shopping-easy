import bcrypt from 'bcrypt';
import JWT from 'jsonwebtoken';

import userModel from '../models/user.js';

export const signUp = async (req, res) => {
    const {username, email } = req.body;
    
    const oldUser = await userModel.findOne({ email });
    if(oldUser) return res.status(400).json({message: "User already exists!"});

    const hashedPassword = await bcrypt.hash(req.body.password, 12);

    const user = new userModel({ username, email, password: hashedPassword });
    try {
        await user.save();
        const token = JWT.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, {expiresIn: "2h"});
        const { password, ...other } = user._doc;
        return res.status(200).json({...other, token});

    } catch (error) {
        console.log(error);
        return res.satus(500).json({message: error});
    }
}

export const signIn = async (req, res) => {
    const { username } = req.body;

    try {
        const oldUser = (await userModel.findOne({ username })) || (await userModel.findOne({ email: username }));

        if(!oldUser) return res.status(404).json({ message: "Invalid Credentials"});

        const isPasswordCorrect = await bcrypt.compare(req.body.password, oldUser.password);
        if(!isPasswordCorrect) return res.status(400).json({ message: "Invalid Credentials" }); 
        
        const token = JWT.sign({ id: oldUser._id, isAdmin: oldUser.isAdmin }, process.env.JWT_SECRET, {expiresIn: "2h"});
        const {password, ...other} = oldUser._doc;
        return res.status(200).json({...other, token})

    } catch (error) {
        console.log(error);
        return res.status(500).json({message: error});
    }
}