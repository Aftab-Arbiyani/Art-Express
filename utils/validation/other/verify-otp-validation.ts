import Joi from 'joi';

export const verifyOtpSchema = Joi.object({
    email: Joi.string().email().required().label('Email'),
    otp: Joi.string().min(6).required().label('OTP'),
});