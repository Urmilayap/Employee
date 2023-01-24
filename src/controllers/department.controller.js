const { departmentService } = require('../services');
const { error, success } = require('@yapsody/lib-handlers');
const { checkChanges } = require('@yapsody/lib-utils');
const { departmentValidation,getId,getListValidation,updateDepartmentValidation,recoveryParamsValidation} = require('../validations');

//create Department
  const addDepartment = async (req ,res ,next) => {
   try {
    const { department_name, department_details_id }  = await departmentValidation.validateAsync(req.body);
    const department = await departmentService.addDepartment({ department_name, department_details_id });
    return success.handler({ department }, req, res, next);
    } catch (err) {
      switch (err.name) {
        case 'SequelizeUniqueConstraintError':
          err.custom_key = 'departmentConflict';
          err.message = `department with name ${req.body.department_name} already exists`;
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


  //Get all Departments List
  const getAll = async (req, res, next) => {
    const reqData = { ...req.query };
     try {
      const { page_size,page_no, min_income } = await getListValidation.validateAsync(reqData);
      const departments = await departmentService.getAll({ page_size, page_no,min_income } );
      return success.handler({ departments }, req, res, next);
    }  catch (err) {
      return error.handler(err, req, res, next);
    }
  };


//Update department by ID
 const updateDepartment = async (req, res, next) => {
  const { departmentId } = req.params;
  try {
    const id = await getId.validateAsync(departmentId);
    const { department_id,department_name,enable,version,
    } = await updateDepartmentValidation.validateAsync({ ...req.body });

    let item = await departmentService.getById({ id });
    const difference = checkChanges({
      department_id,department_name,enable,version,
    }, item);

    if (item.version !== version) {
      error.throwPreconditionFailed({
        message: 'Object has been updated since you last opened, do you want to reload the new version or overwrite existing changes done?',
        difference,
      });
    }

    item.department_id = department_id !== undefined ? department_id : item.department_id;
    item.department_name= department_name !== undefined ? department_name : item.department_name;
    item.version = version + 1;

    item = await item.save();

    return success.handler({ departments: item }, req, res, next);
  } catch (err) {
    return error.handler(err, req, res, next);
  }
  };

  module.exports = { addDepartment, getById, deleteDepartment, getAll, updateDepartment };