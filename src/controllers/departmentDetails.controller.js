/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const { error, success } = require('@yapsody/lib-handlers');
const { departmentDetailsService } = require('../services');
const { departmentDetailsValidation } = require('../validations');

// create Department
const addDepartmentdetails = async (req, res, next) => {
  try {
    const {
      min_income, max_income, description, introduced_date,
    } = await departmentDetailsValidation.validateAsync(req.body);
    const departmentdetails = await departmentDetailsService.addDepartmentdetails({
      min_income, max_income, description, introduced_date,
    });
    console.log('------------>', departmentdetails);
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

const getAllDepartmentdetails = async (req, res, next) => {
  const reqData = { ...req.query };
  if (reqData.ids) {
    reqData.ids = reqData.ids.split(';');
  }
  try {
    const validate = await getListValidation.validateAsync(reqData);
    const departments = await departmentDetailsService.getAllDepartmentdetails();
    return success.handler({ departments }, req, res, next);
  } catch (err) {
    return error.handler(err, req, res, next);
  }
};

module.exports = { addDepartmentdetails, getAllDepartmentdetails };
