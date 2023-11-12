import Joi from 'joi';

export const artistEditSchema = Joi.object({
  email: Joi.string().email().label('Email').messages({
    'string.required': 'Email is required.'
  }),
  first_name: Joi.string().label('First Name'),
  last_name: Joi.string().label('Last Name'),
  description: Joi.string().label('Description'),
  phone_number: Joi.string().regex(/^[0-9]{10}$/).label('Mobile number').messages({
    'string.pattern.base': 'Invalid mobile number format.',
  }),
  make_custom_art: Joi.bool()
});