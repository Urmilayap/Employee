const { error, success } = require('@yapsody/lib-handlers');
const { departmentDetailsService } = require('../services');
const { departmentDetailsValidation, getId, getListValidation } = require('../validations');

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
    await getListValidation.validateAsync(reqData);
    const departments = await departmentDetailsService.getAllDepartmentdetails();
    return success.handler({ departments }, req, res, next);
  } catch (err) {
    return error.handler(err, req, res, next);
  }
};

// Get Department by ID
const getById = async (req, res, next) => {
  const { departmentdetailsId } = req.params;
  try {
    const id = await getId.validateAsync(departmentdetailsId);
    const departmentdetails = await departmentDetailsService.getById({ id });
    return success.handler({ departmentdetails }, req, res, next);
  } catch (err) {
    return error.handler(err, req, res, next);
  }
};

// Get all Departments List
const getAll = async (req, res, next) => {
  const reqData = { ...req.query };
  try {
    const { page_size, page_no, min_income } = await getListValidation.validateAsync(reqData);
    const departmentsdetails = await departmentDetailsService.getAll({ page_size, page_no, min_income });
    return success.handler({ departmentsdetails }, req, res, next);
  } catch (err) {
    return error.handler(err, req, res, next);
  }
};

module.exports = {
  addDepartmentdetails, getById, getAll, getAllDepartmentdetails,
};
