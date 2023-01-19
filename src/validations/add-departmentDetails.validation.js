const Joi = require('joi');
const yapValidations = require('@yapsody/lib-validations');

module.exports = Joi.object()
  .keys({
    min_income: yapValidations
      .id.required()
      .label('Min. Income'),
    max_income: yapValidations
      .id
      .required()
      .label('Max. Income'),
    description: yapValidations
      .description
      .required()
      .label('Description'),
    introduced_date: yapValidations
      .generic.date.iso
      .required()
      .label('Introduced Date of Department')
    
  });
