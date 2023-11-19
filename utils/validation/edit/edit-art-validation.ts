import Joi from 'joi';

export const editArtValidation = Joi.object({
    fk_category: Joi.string().uuid().label('Category'),
    display_spot: Joi.string().uuid().label('Display Spot'),
    color: Joi.string().uuid().label('Color'),
    fk_art_medium: Joi.string().uuid().label('Art Medium'),
    title: Joi.string().label('Title'),
    description: Joi.string().label('Description'),
    height: Joi.number().label('Height'),
    width: Joi.number().label('Width'),
    price: Joi.number().label('Price'),
    discount: Joi.number().label('Discount'),
    is_active: Joi.boolean(),
    is_sold: Joi.boolean(),
    removed_image: Joi.array()
})