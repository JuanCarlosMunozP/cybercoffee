import db from "../models/database.model.js";

const User = db.users;

export const RegisterService = ({
    name,
    email,
    password
}) => {
    
    const newUser = User.create({
        name,
        email,
        password
    })

    return newUser;
}