import Joi from 'joi';

export const categoryEditSchema = Joi.object({
    title: Joi.string().label('title'),
    description: Joi.string().label('description'),
});