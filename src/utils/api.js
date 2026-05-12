import express from 'express';
import path from 'path';
import {fileURLToPath} from 'url';

import productRoutes from '../routes/product.routes.js'
import authRoutes from '../routes/auth.routes.js';
import adminRoutes from '../routes/admin.routes.js';
import profileRoutes from '../routes/profile.routes.js';
import otpRoutes from '../routes/otp.routes.js';
import db from '../models/database.model.js';


const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(
    express.static(
        path.join(__dirname,"../")
    )
)

app.get("/login",(req,res) => {
    res.sendFile(
        path.join(__dirname,"../views/login.html")
    )
})

app.get("/register", (req,res) => {
    res.sendFile(
        path.join(__dirname,"../views/register.html")
    )
})

app.get("/products",(req,res) => {
    res.sendFile(
        path.join(__dirname,"../views/products.html")
    )
})

app.get("/profile",(req,res) => {
    res.sendFile(
        path.join(__dirname,"../views/profile.html")
    )
})

app.use(productRoutes);

app.use(authRoutes);

app.use(adminRoutes)

app.use(profileRoutes)

app.use(otpRoutes)

db.sequelize.sync()
    .then(() => {
        console.log("Conection db successfully");
    })
    .catch((err) => {
        console.log("Failed to connect db: " + err.message);
    })



export default app;