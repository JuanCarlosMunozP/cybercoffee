const optStore = {};

export const generateOtpService = (
    email
) => {
    const otp = Math.floor(
        10000 + Math.random() * 900000
    ).toString();

    optStore[email] = otp;

    console.log(
        `OTP generado para ${email}: ${otp}`
    )

    return otp;
}

export const verifyOtpService = (
    email,
    otp
) => {

    const validOtp = optStore[email];

    if (validOtp === otp) {

        return {
            success:true
        }
    }

    return {
        success:false
    }
}