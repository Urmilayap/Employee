const yapUtil = require('@yapsody/lib-utils');
const { error } = require('@yapsody/lib-handlers');
const { Op } = require('sequelize');
const { STATUS } = require('../consts');
const { sequelizeManager } = require('../managers');
const {departmentModel,employeeDetailsModel,departmentDetailsModel} = sequelizeManager;
const { recoveryOptionsUtils: { getDeleteRecoveryOptions } } = require('../utils');

//Create Department
const addDepartment = async ({ department_name, department_id, departmentdetails_id }) => departmentModel.create({ 
  department_name, department_id, departmentdetails_id});

//Get Department BY ID
const getById = async ({ id }) => {
    const where = { department_id : id};
    console.log(where);
    const department = await departmentModel.findOne({
      where,
      include: [
        {
          model: employeeDetailsModel,
        },
      ],
    });
    console.log("--------------------->",department);
    if (!department) {
      return error.throwNotFound({ custom_key: 'DepartmentNotFound', data: 'departments' });
    }
    
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
const getAll = async ({ 
  page_size, 
  page_no}) => {
  console.log({page_no,page_size});
  const limit = page_size;
  const offset = (page_no - 1) * limit; 

  // const where = {
  //   departmentName,
  // };

  // if (search) {
  //   where.name = {
  //     [Op.like]: `%${search}%`,
  //   };
  // }
  return departmentModel.findAll({  offset, limit });
};

module.exports = { addDepartment, getById, deleteDepartment, getAll } ;