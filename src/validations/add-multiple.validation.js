const Joi = require('joi');
const yapValidations = require('@yapsody/lib-validations');

module.exports = Joi.array().items(
  Joi.object().keys({

    employee_id: yapValidations
      .id
      .required()
      .label('Employee ID'),
    first_name: yapValidations
      .name
      .required()
      .label('First Name'),
    last_name: yapValidations
      .name
      .required()
      .label('Last Name'),
    email_id: yapValidations
      .email
      .required()
      .label('Email Id'),
    phone_no: yapValidations
      .phoneNo
      .required()
      .label('Phone No'),
    address: yapValidations
      .description
      .label('Address'),
  }),
);
