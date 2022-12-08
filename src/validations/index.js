const employeeValidation = require('./add-Employee.validation');
const getListValidation = require('./get-list.validation');
const getId = require('./get-id.validation');
const updateValidation = require('./update-employee.validation');
const recoveryParamsValidation = require('./recovery-params-validation');

module.exports = {
  employeeValidation,
  getListValidation,
  getId,
  updateValidation,
  recoveryParamsValidation,
};
