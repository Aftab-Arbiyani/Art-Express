import Joi from 'joi';

export const createArtValidation = Joi.object({
    fk_category: Joi.string().uuid().required().label('Category'),
    display_spot: Joi.string().uuid().required().label('Display Spot'),
    color: Joi.string().uuid().required().label('Color'),
    fk_art_medium: Joi.string().uuid().required().label('Art Medium'),
    title: Joi.string().required().label('Title'),
    description: Joi.string().required().label('Description'),
    height: Joi.number().label('Height'),
    width: Joi.number().label('Width'),
    price: Joi.number().required().label('Price'),
    discount: Joi.number().label('Discount'),
    is_active: Joi.boolean()
})