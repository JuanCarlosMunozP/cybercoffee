import { Router } from "express";
import { generateOtpController, verifyOtpController } from "../controllers/otp.controller.js";


const router = Router();

router.post(
    "/generate-otp",
    generateOtpController
)

router.post(
    "/verify-otp",
    verifyOtpController
)

export default router;