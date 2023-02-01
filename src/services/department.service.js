const { error } = require('@yapsody/lib-handlers');
const { STATUS } = require('../consts');
const { sequelizeManager } = require('../managers');
const { DepartmentModel,EmployeeDetailsModel } = sequelizeManager;
const { recoveryOptionsUtils: { getDeleteRecoveryOptions } } = require('../utils');

//Create Department
const addDepartment = async ({ department_name, department_details_id }) =>  DepartmentModel.create({ 
  department_name, 
  department_details_id });


//Get Department BY ID
const getById = async ({ department_id }) => {
     const where = { department_id };
     const department = await DepartmentModel.findOne({
      where,
      // include: [
      //   {
      //     model: EmployeeDetailsModel,
      //   },
      // ],
      
    });
    console.log({ department });
    // if (!department) {
    //   return error.throwNotFound({ custom_key: 'DepartmentNotFound', data: 'departments' });
    // }
    
    return department;
    
  };

//Delete department by ID
const deleteDepartment = async ({ id, force_update }) => {
    const data = await getById({
      id
    });
    if (force_update) {
      return data.destroy();
    }
    if (data.status === STATUS.ENABLED) {
      return error.throwPreconditionFailed({
        message: 'Enabled department can\'t be deleted',
        recovery: {
          message: 'do you want to force delete?',
          options: getDeleteRecoveryOptions({ departmentId: id }, true),
        },
      });
    }
    return data.destroy();
    
   };

//Get all departmentList
const getAll = async () => {
  return DepartmentModel.findAll();
};

module.exports = { addDepartment, getById, deleteDepartment, getAll } ;