const { departmentDetailsService } = require('../services');
const { error, success } = require('@yapsody/lib-handlers');
const {  departmentDetailsValidation } = require('../validations');



//create Department
  const addDepartmentdetails = async (req ,res ,next) => {
    try {
    const {  min_income, max_income, description, introduced_date }= await departmentDetailsValidation.validateAsync(req.body);
    const departmentdetails = await departmentDetailsService.addDepartmentdetails({ 
      min_income, max_income, description, introduced_date });
      console.log('------------>',departmentdetails);
    return success.handler({ departmentdetails }, req, res, next);
    } catch (err) {
      switch (err.department_id) {
        case 'SequelizeUniqueConstraintError':
          err.custom_key = 'departmentConflict';
          err.message = `department with id ${req.body.department_id} already exists`;
          break;
        default:
          break;
      }
      return error.handler(err, req, res, next);
    }
  };

  module.exports = { addDepartmentdetails };