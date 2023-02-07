const employeeValidation = require('./add-Employee.validation');
const getListValidation = require('./get-list.validation');
const getId = require('./get-id.validation');
const updateValidation = require('./update-employee.validation');
const recoveryParamsValidation = require('./recovery-params-validation');
const departmentValidation = require('./add-Department.validation');
const updateDepartmentValidation = require('./update-department.validation');
const multipleUserValidation = require('./add-multiple.validation');
const departmentDetailsValidation = require('./add-departmentDetails.validation');
const addOneValidation = require('./add-one.validation');
const updateDepartmentdetailsValidation = require('./update-departmentdetails.validation');

module.exports = {
  employeeValidation,
  getListValidation,
  getId,
  updateValidation,
  recoveryParamsValidation,
  departmentValidation,
  updateDepartmentValidation,
  multipleUserValidation,
  departmentDetailsValidation,
  addOneValidation,
  updateDepartmentdetailsValidation,
};
