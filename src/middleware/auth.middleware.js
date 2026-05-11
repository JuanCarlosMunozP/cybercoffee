import jwt from 'jsonwebtoken';
import db from '../models/database.model.js';

const Users = db.users;

export const verifyToken = async (req,res,next) => {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            error:"Token required"
        })
    }

    const token = authHeader.split(" ")[1];

    try {
        
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET,
            {
                algorithms:["HS256"]
            }
        );

        req.user = {
            id:decoded.id,
            email:decoded.email
        }

        next();
    } catch (error) {
        
        return res.status(403).json({
            error:"Invalid token"
        })
    }
}

export const verifyAdmin = async (
    req,res,next
) => {

    const user = await Users.findByPk(
            req.user.id
    )

    if (!user) {

        return res.status(404).json({
            error:"User not found"
        })
    }

    if (user.role !== "admin") {

        return res.status(403).json({
        error:"Access denied"
        })
    }

    next();
}