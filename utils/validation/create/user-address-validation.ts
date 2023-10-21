import Joi from 'joi';

export const userAddressCreateSchema = Joi.object({
  full_name: Joi.string().required().label('Name'),
  phone_number: Joi.string().regex(/^[0-9]{10}$/).label('Mobile Number').messages({
    'string.pattern.base': 'Invalid mobile number format.',
  }),
  fk_country: Joi.string().uuid().required().label('Country'),
  fk_state: Joi.string().uuid().required().label('State'),
  fk_city: Joi.string().uuid().required().label('City'),
  zip_code: Joi.string().required().label('Zip Code'),
  address: Joi.string().label('Street'),
  address_type: Joi.string().valid('House', 'Office', 'Other').required().label('Address Type'),
  is_default: Joi.boolean().label('Is Primary Address')
});