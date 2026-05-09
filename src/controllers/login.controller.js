import { loginService } from "../services/login.service.js"

export const loginController = async (req,res) => {
    try {
        const userFound = await loginService(req.body);

        return res.status(200).json({
            message:"Inicio de sesión exitoso",
            data:userFound
        })
    } catch (error) {
        return res.status(400).json({
            error:error.message
        })
    }
}