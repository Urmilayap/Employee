const Joi = require('joi');
const yapValidations = require('@yapsody/lib-validations');

module.exports = Joi.object()
  .keys({
    employee_id: yapValidations
      .id
      .required()
      .label('Employee ID'),
    first_name: yapValidations
      .name
      .required()
      .label('first_name'),
    last_name: yapValidations
      .name
      .required()
      .label('last_name'),
    email_id: yapValidations
      .email
      .required()
      .label('email_id'),
    phone_no: yapValidations
      .phoneNo
      .required()
      .label('phone_no'),
    address: yapValidations
      .description
      .label('address'),
  });
