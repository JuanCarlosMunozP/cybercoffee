import db from "../models/database.model.js";
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const User = db.users;

export const RegisterService = async ({
    name,
    email,
    password,
}) => {

    
    if (!name || name.length < 3) {
        throw new Error("Invalid name");
    }

    // const isEmailValid = validator.isEmail(email, 
    //     {
    //         allow_utf8_local_part:false,
    //         allow_ip_domain:false
    //     }
    // );

    // if (!isEmailValid) {
    //     throw new Error("Invalid email");
    // }

    const isValidPassword = validator.isStrongPassword(password, {
        minLength:8,
        minLowercase:1,
        minNumbers:1,
        minSymbols:1
    })

    if (!isValidPassword) {
        throw new Error("Password no secure. Shoud hae eight characters, 1 letter upper, 1 letter minus, 1 number and a symbol.")
    }

    const hashedPassword = await bcrypt.hash(password,10);

    const newUser = await User.create({
        name,
        email,
        password:hashedPassword,
        verified:false,
        role:"user"
    })

    const accessToken = jwt.sign(
        {
            id:newUser.id,
            email:newUser.email,
            role:newUser.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn:"30m",
            algorithm:"HS256"
        }
    )


    return {
        user: {
            id:newUser.id,
            name:newUser.name,
            email:newUser.email,
            role:newUser.role
        },
        accessToken:accessToken,
    }
}