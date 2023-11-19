import Joi from 'joi';

export const fkArtSchema = Joi.object({
    fk_art: Joi.string().uuid().required().label('Art id')
});