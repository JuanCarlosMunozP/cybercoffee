import db from "../models/database.model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const Users = db.users;

export const loginService = async ({email,password}) => {
    
    const userFound = await Users.findOne({
        where: {
            email:email
        }
    });

    if (!userFound) {
        throw new Error("User not found");
    }

    const isMatch = await bcrypt.compare(
        password,
        userFound.password
    );

    if (!isMatch) {
        throw new Error({error:"Invalid password"});
    }

    const accessToken = jwt.sign(
        {
            id:userFound.id,
            email:userFound.email,
        },
        process.env.JWT_SECRET,
        {
            expiresIn:"30m", 
            algorithm:"RS256"
        }
    )

    const refreshToken = jwt.sign(
        {
            email:userFound.email
        },
        process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET,
        {
            expiresIn:"7d"
        }
    )
    return {
        user: {
            id:userFound.id,
            name:userFound.name,
            email:userFound.email,
            role:userFound.role
        },
        accessToken:accessToken,
        refreshToken:refreshToken,
    };
}