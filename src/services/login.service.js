import db from "../models/database.model.js";

const Users = db.users;

export const loginService = async ({email,password}) => {
    
    const userFound = await User.findOne({
        where: {
            email:email
        }
    });

    if (!userFound) {
        throw new Error("User not found");
    }

    if (userFound.password !== password) {
        throw new Error("Password incorrect");
    }

    return userFound;
}