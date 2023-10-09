import Joi from 'joi';

export const signupSchema = Joi.object({
    email: Joi.string().email().required().label('Email').messages({
        'string.required': 'Email is required.'
    }),
    password: Joi.string().required().min(8).regex(/^(?=.*\d)(?=.*[a-z])(?=.*[a-zA-Z]).{8,}$/i).label('Password').messages({
        'string.min': 'Password must be of minimum length 8.',
        'string.required': 'Password is required.',
        'string.pattern.base': 'Password must have a capital, small and special character.'
    }),
    confirm_password: Joi.string().required().min(8).regex(/^(?=.*\d)(?=.*[a-z])(?=.*[a-zA-Z]).{8,}$/i).label('Confirm Password').messages({
        'string.min': 'Password must be of minimum length 8.',
        'string.required': 'Password is required.',
        'string.pattern.base': 'Password must have a capital, small and special character.'
    }),
});