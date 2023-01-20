const Joi = require('joi');
const yapValidations = require('@yapsody/lib-validations');

module.exports = Joi.object()
  .keys({
    department_id: yapValidations
      .id
      .required()
      .label('Department ID'),
    department_details_id: yapValidations
      .id
      .required()
      .label('Department Details Table ID'),
    department_name: yapValidations
      .name
      .required()
      .label('Department Name'),
    
  });
