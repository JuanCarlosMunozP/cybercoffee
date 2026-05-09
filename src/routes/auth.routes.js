import { Router } from "express";
import { loginController } from "../controllers/login.controller.js";
import { RegisterController } from "../controllers/register.controller.js";

const router = Router();

router.post('/login',loginController);
    
router.post('/register',RegisterController);

export default router;