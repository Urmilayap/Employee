const yapUtil = require('@yapsody/lib-utils');
const { error } = require('@yapsody/lib-handlers');
const { Op ,ids, search ,sort_by ,sort_order} = require('sequelize');
const { STATUS } = require('../consts');
const { sequelizeManager } = require('../managers');
const {departmentModel,employeeDetailsModel} = sequelizeManager;
const { recoveryOptionsUtils: { getDeleteRecoveryOptions } } = require('../utils');

//Create Department
const addDepartment = async ({ department_id,department_name,employee_id }) => departmentModel.create({ 
    department_id,department_name,employee_id });

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

//Get all Employees List
const getAll = async ({ department_id,department_name }) => {
  const where = { ids };
  if (ids) {
    where.id = ids;
  }
  if (search) {
    where.department_name = {
      [Op.like]: `%${search}%`,
    };
  }
  const order = [];
  order.push([sort_by, sort_order]);
  return departmentModel.findAll({ department_id,department_name });
};

module.exports = { addDepartment, getById, deleteDepartment, getAll } ;