import { generateOtpService, verifyOtpService } from "../services/otp.service.js";

export const generateOtpController = 
async (
    req,res
) => {

    const {email} = req.body;

    const otp = 
        await generateOtpService(email);

    return res.status(200).json({
        message:"OTP generated",
        otp
    })
}

export const verifyOtpController = 
async (
    req,res 
) => {

    const {
        email,
        otp
    } = req.body;

    const result = 
        await verifyOtpService(email,otp);

    if (!result.success) {

        return res.status(401).json({
            error:"Invalid OTP"
        })
    }

    return res.status(200).json({
        message:"OTP valid"
    })
}