import { RegisterService } from "../services/register.service.js"

export const RegisterController = async (req,res) => {
    try {
        const user = await RegisterService(req.body);

        return res.status(201).json({
            message:"Usuario registrado correctamente",
            data:user
        })
    } catch (error) {
        return res.status(400).json({
            error:error.message
        })
    }
}