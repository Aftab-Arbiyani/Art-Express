import Joi from 'joi';

export const categoryCreateSchema = Joi.object({
    title: Joi.string().label('title').required(),
    description: Joi.string().label('description').required(),
});