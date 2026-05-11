import bcrypt from 'bcrypt';

const optStore = {};

export const generateOtpService = async (
    email
) => {
    const otp = Math.floor(
        10000 + Math.random() * 900000
    ).toString();

    const hashedOtp = await bcrypt.hash(
        otp,
        10
    )

    optStore[email] = {
        otp:hashedOtp,
        expires:Date.now() + (5 * 60 * 1000),
        attempts:8,
        blockedUntil:null
    }

    console.log(
        `OTP generado para ${email}: ${otp}`
    )

    return true;
}

export const verifyOtpService = (
    email,
    otp
) => {

    const storedOtp = optStore[email];

    if (!storedOtp) {

        return {
            success:false,
            message:"OTP not found"
        }
    }

    if (
        storedOtp.blockedUntil &&
        Date.now() < storedOtp.blockedUntil
    ) {
        return {
            success:false,
            message:"Too many attempts, Try later."
        }
    }

    if (
        Date.now() > storedOtp.expires 
    ) {
        
        delete optStore[email]

        return {
            success:false,
            message:"OTP expired"
        }
    }

    const isMatch = await bcrypt.compare(
        otp,
        storedOtp.otp
    )

    if (!isMatch) {

        storedOtp.attempts += 1;

        if (storedOtp.attempts >= 5) {
            storedOtp.blockedUntil = 
                Date.now() + (15 * 60 * 1000);

            return {
                success:false,
                messag:"Too many attempts"
            }
        }

        return {
            success:false,
            message:"Invalid OTP"
        }
    }

    delete otpStore[email];

    return {
        success:true
    }
}