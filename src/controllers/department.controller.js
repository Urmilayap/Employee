const { departmentService } = require('../services');
const { error, success } = require('@yapsody/lib-handlers');
const { checkChanges } = require('@yapsody/lib-utils');
const config = require('../config/employeeDetails.config.json');
const config1 = require('../config/department.config.json');

const { departmentValidation,getId} = require('../validations');
const { version } = require('chai');


//create Department
  const addDepartment = async (req ,res ,next) => {
    try {
    const { department_id,department_name }  = await departmentValidation.validateAsync(req.body);
    const department = await departmentService.addDepartment({ department_id,department_name })
    return success.handler({ department }, req, res, next);
    } catch (err) {
      switch (err.name) {
        case 'SequelizeUniqueConstraintError':
          err.custom_key = 'departmentConflict';
          err.message = `department with name ${req.body.name} already exists`;
          break;
        default:
          break;
      }
      return error.handler(err, req, res, next);
    }
  };

//Get Department by ID
 const getById = async (req, res, next) => {
   const { departmentId } = req.params;
  try {
    const id = await getId.validateAsync(departmentId);
    const department = await departmentService.getById({ id });
    return success.handler({ department }, req, res, next);
  } catch (err) {
    return error.handler(err, req, res, next);
  }
  };

//Delete Department by ID
const deleteDepartment = async (req, res, next) => {
    const { departmentId } = req.params;
  const { force_update } = req.query;
  try {
    await recoveryParamsValidation.validateAsync(force_update);
    const id = await getId.validateAsync(departmentId);
    const department = await departmentService.deleteDepartment({
      id,
      force_update,
    });
    return success.handler({ department }, req, res, next);
  } catch (err) {
    return error.handler(err, req, res, next);
  }
  };

  module.exports = { addDepartment, getById, deleteDepartment, };