const { departmentService, departmentDetailsService } = require('../services');
const { error, success } = require('@yapsody/lib-handlers');

const { departmentValidation,getId,getListValidation,updateDepartmentValidation,recoveryParamsValidation, departmentDetailsValidation} = require('../validations');
const { version } = require('chai');


//create Department
  const addDetails = async (req ,res ,next) => {
    console.log(req.body);
    try {
    const validateDetails = await departmentDetailsValidation.validateAsync(req.body);
    console.log("------------>",validateDetails);
    const details = await departmentDetailsService.addDetails(validateDetails);
    return success.handler({ details }, req, res, next);
    } catch (err) {
      switch (err.name) {
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

  module.exports = { addDetails};