import { Router } from "express";
import { getProfileController } from "../controllers/profile.controller.js";
import {  verifyAdmin, verifyToken } from "../middleware/auth.middleware.js";


const router = Router();

router.get(
    "/profile/:id",
    verifyToken,
    verifyAdmin,
    getProfileController,

)

export default router;