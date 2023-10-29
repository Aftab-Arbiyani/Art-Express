import Joi from 'joi';

export const artMediumCreateSchema = Joi.object({
    title: Joi.string().required().label('title'),
    description: Joi.string().required().label('description'),
});