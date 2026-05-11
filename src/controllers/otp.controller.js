import { generateOtpService, verifyOtpService } from "../services/otp.service.js";

export const generateOtpController = 
async (
    req,res
) => {

    const {email} = req.body;

    await generateOtpService(email);

    return res.status(200).json({
        message:"OTP generated successfully",
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
            error:result.message
        })
    }

    return res.status(200).json({
        message:"OTP valid"
    })
}