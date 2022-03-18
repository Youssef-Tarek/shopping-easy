import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import userRoutes from './routes/user.js';
import authRoutes from './routes/auth.js';
import productRoutes from './routes/product.js'
import cartRoutes from './routes/cart.js';
import orderRoutes from './routes/order.js';
    
dotenv.config()

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/order', orderRoutes);
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL)
         .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
         .catch(error => console.log(error));

