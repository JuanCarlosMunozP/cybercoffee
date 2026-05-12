import bcrypt from 'bcrypt';
import crypto from 'crypto';

const otpStore = {};

export const generateOtpService = async (
    email
) => {

    const otp = crypto.randomInt(
        100000,
        999999
    ).toString();

    const hashedOtp = await bcrypt.hash(
        otp,
        10
    );

    otpStore[email] = {
        otp:hashedOtp,
        expires:Date.now() + (5 * 60 * 1000),
        attempts:0,
        blockedUntil:null
    };

    console.log(
        `OTP generado para ${email}: ${otp}`
    );

    return true;
};

export const verifyOtpService = (
    email,
    otp
) => {

    const data = otpStore[email];

    if (!data) {
        return {success:false};
    }

    if (Date.now() > data.expires) {

        delete otpStore[email];

        return {success:false};
    }

    if (data.otp !== otp) {

        return {success:false};
    }

    delete otpStore[email];

    return {
        success:true
    }
}