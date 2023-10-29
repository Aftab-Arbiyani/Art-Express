import Joi from 'joi';

export const artMediumEditSchema = Joi.object({
    title: Joi.string().label('title'),
    description: Joi.string().label('description'),
});