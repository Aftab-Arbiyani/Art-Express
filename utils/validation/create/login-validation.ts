import Joi from 'joi';

export const loginSchema = Joi.object({
    email: Joi.string().email().required().label('Email').messages({
        'string.required': 'Email is required.'
    }),
    password: Joi.string().required().label('Password').messages({
        'string.required': 'Password is required.',
    }),
});