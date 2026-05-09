import { Router } from "express";
import { loginController } from "../controllers/login.controller.js";
import { RegisterController } from "../controllers/register.controller.js";

const router = Router();

export const authRoutes = () => {
    router.post('/login',loginController);
    router.post('/register',RegisterController);
}

authRoutes();

export default router;