import express from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
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

const otpLimiter = rateLimit({

    windowMs: 15 * 60 * 1000,

    max:5,

    message: {
        error: "Too many requests"
    }
})
app.use(express.urlencoded({extended:true}));

app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],

            scriptSrc:[
                "'self'"
            ],

            styleSrc:[
                "'self'",
                "https://fonts.googleapis.com"
            ],
            imgSrc:[
                "'self'",
                "data:"
            ],
            fontSrc:[
                "'self'",
                "http://fonts.gstatic.com"
            ],

            connectSrc: [
                "'self'"
            ],
            objectSrc:[
                "'none'"
            ],

            upgradeInsecureRequests:[],

            reportUrl:"/csp-report"
        }
    },
    frameguard:{
        action:'deny'
    },
    referrerPolicy:{
        policy:"no-referrer"
    },

    hsts: {
        maxAge:3153600,
        includeSubDomain:true,
        preload:true
    },
    noSniff:true
}));

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

app.post(
    "/csp-report",
    express.json({
        type:[
            "application/csp-report",
            "application/json"
        ]
    }),
    (req,res) => {

        console.log(
            "CSP Violation",
            req.body
        );

        res.status(204).end();
    }
)

app.use(productRoutes);

app.use(authRoutes);

app.use(adminRoutes)

app.use(profileRoutes)

app.use(otpRoutes, otpLimiter)

db.sequelize.sync()
    .then(() => {
        console.log("Conection db successfully");
    })
    .catch((err) => {
        console.log("Failed to connect db: " + err.message);
    })


export default app;