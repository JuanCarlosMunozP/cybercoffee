import dotenv from 'dotenv';
import express from 'express';

import productRoutes  from '../routes/product.routes.js';
import authRoutes  from '../routes/auth.routes.js';
import db from '../models/database.model.js';

dotenv.config()

const app = express();

app.use(express.json());

app.use(productRoutes);

app.use(authRoutes);

db.sequelize.sync()
    .then(() => {
        console.log("Conection db successfully");
    })
    .catch((err) => {
        console.log("Failed to connect db: " + err.message);
    })



export default app;