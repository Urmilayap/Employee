const { error, success } = require('@yapsody/lib-handlers');
const { checkChanges } = require('@yapsody/lib-utils');
const { departmentDetailsService } = require('../services');
const {
  departmentDetailsValidation, getId, getListValidation, updateDepartmentdetailsValidation,
} = require('../validations');

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
    const { department_details_id, page_no, page_size } = await getListValidation.validateAsync(reqData);
    const departmentsdetails = await departmentDetailsService.getAll({ department_details_id, page_no, page_size });
    return success.handler({ departmentsdetails }, req, res, next);
  } catch (err) {
    return error.handler(err, req, res, next);
  }
};

const updateDepartmentdetails = async (req, res, next) => {
  const reqData = { ...req.query };
  console.log(reqData);
  try {
    const { department_details_id } = await getListValidation.validateAsync(reqData);

    const departmentdetailslist = await departmentDetailsService.getById({ department_details_id });

    const { min_income } = await updateDepartmentdetailsValidation.validateAsync({ ...req.body });

    const check = checkChanges({ min_income }, departmentdetailslist);
    console.log('------->', check);
    departmentdetailslist.min_income = min_income + 1000;
    const data = await departmentdetailslist.save();
    return success.handler({ data }, req, res, next);
  } catch (err) {
    return error.handler(err, req, res, next);
  }
};

module.exports = {
  addDepartmentdetails,
  getById,
  getAll,
  getAllDepartmentdetails,
  updateDepartmentdetails,
};
