const Joi = require('joi');
const yapValidations = require('@yapsody/lib-validations');

module.exports = Joi.object()
  .keys({
    employee_id: yapValidations
      .id
      .required()
      .label('Employee ID'),
    department_id: yapValidations
      .id
      .label('Department ID'),
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
    department_details_id: yapValidations
      .id
      .required()
      .label('Department Details Table ID'),
    department_name: yapValidations
      .name
      .required()
      .label('Department Name'),
    min_income: yapValidations
      .generic.number.integer
      .required()
      .label('Min. Income'),

    max_income: yapValidations
      .generic.number.integer
      .required()
      .label('Max. Income'),

    description: yapValidations
      .description
      .required()
      .label('Description'),

    introduced_date: yapValidations
      .generic.date.iso
      .required()
      .label('Introduced Date of Department'),
  });
