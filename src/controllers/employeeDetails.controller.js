const { employeeDetailsService } = require('../services');
const { error, success } = require('@yapsody/lib-handlers');
const { checkChanges } = require('@yapsody/lib-utils');
const config = require('../config/employeeDetails.config.json');
const {employeeValidation,getId,getListValidation,recoveryParamsValidation,updateValidation, multipleUserValidation} = require('../validations');
const { version } = require('chai');


//create Employee details
  const addEmployee = async (req ,res ,next) => {
    try {
      console.log('--------->',req.body);
    const { employee_id,department_id,first_name,last_name,address,email_id,phone_no,
     }  = await employeeValidation.validateAsync(req.body);
    const employee = await employeeDetailsService.addEmployee({ employee_id,department_id,first_name, last_name, email_id, phone_no, address, })
    console.log("------------>",employee);
    return success.handler({ employee }, req, res, next);
    } catch (err) {
      switch (err.name) {
        case 'SequelizeUniqueConstraintError':
          err.custom_key = 'employeeDetailsConflict';
          err.message = `employee with name ${req.body.name} already exists`;
          break;
        default:
          break;
      }
      return error.handler(err, req, res, next);
    }
  };

  const multipleUsers = async (req ,res ,next) => {
    console.log(req.body);
    try {
    const validateBody = await multipleUserValidation.validateAsync(req.body);
    console.log("-------------->",validateBody);
    const update = await employeeDetailsService.multipleUsers(req.body)
    return success.handler({ update }, req, res, next);
    } catch (err) {
      switch (err.name) {
        case 'SequelizeUniqueConstraintError':
          err.custom_key = 'employeeDetailsConflict';
          err.message = `employee with name ${req.body.name} already exists`;
          break;
        default:
          break;
      }
      return error.handler(err, req, res, next);
    }
  };

  //Get Employee by ID
  const getEmployeeById = async (req, res, next) => {
    const { employeeId } = req.params;
  try {
    const id = await getId.validateAsync(employeeId);
    const employee = await employeeDetailsService.getEmployeeById({ id });
    return success.handler({ employee }, req, res, next);
  } catch (err) {
    return error.handler(err, req, res, next);
  }
  };


  //Delete Employee by ID
  const deleteEmployee = async (req, res, next) => {
    const { employeeId } = req.params;
  const { force_update } = req.query;
  try {
    await recoveryParamsValidation.validateAsync(force_update);
    const id = await getId.validateAsync(employeeId);
    const employee = await employeeDetailsService.deleteEmployee({
      id,
      force_update,
    });
    return success.handler({ employee }, req, res, next);
  } catch (err) {
    return error.handler(err, req, res, next);
  }
  };

  //Get all Employees List
  const getAllEmployee = async (req, res, next) => {
    const reqData = { ...req.query };
    if (reqData.ids) {
      reqData.ids = reqData.ids.split(';');
    }
    try {
      const { department_id } = await getListValidation.validateAsync(reqData);
  
      const employees = await employeeDetailsService.getAllEmployee({ department_id });
      return success.handler({ employees }, req, res, next);
    }  catch (err) {
      return error.handler(err, req, res, next);
    }
  };


//Update Employee by ID
 const updateEmployee = async (req, res, next) => {
  const { employeeId } = req.params;
  try {
    const id = await getId.validateAsync(employeeId);
    const {
      first_name,last_name,address,email_id,phone_no,enable,
      version,
    } = await updateValidation.validateAsync({ ...req.body });

    let item = await employeeDetailsService.getEmployeeById({
      id,
    });
    const difference = checkChanges({
      first_name,last_name,address,email_id,phone_no,id,enable,
      version,
    }, item);

    if (item.version !== version) {
      error.throwPreconditionFailed({
        message: 'Object has been updated since you last opened, do you want to reload the new version or overwrite existing changes done?',
        difference,
      });
    }

    item.first_name = first_name !== undefined ? first_name : item.first_name;
    item.last_name = last_name !== undefined ? last_name : item.last_name;
    item.email_id = email_id !== undefined ? email_id : item.email_id;
    item.phone_no = phone_no !== undefined ? phone_no : item.phone_no;
    item.address = address !== undefined ? address : item.address;
    item.version = version + 1;

    item = await item.save();

    return success.handler({ employees: item }, req, res, next);
  } catch (err) {
    return error.handler(err, req, res, next);
  }
  };
 module.exports = {addEmployee ,getEmployeeById ,deleteEmployee ,getAllEmployee ,updateEmployee, multipleUsers};