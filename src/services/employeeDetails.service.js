/* eslint-disable camelcase */
const { error } = require('@yapsody/lib-handlers');
const { STATUS } = require('../consts');
const { sequelizeManager } = require('../managers');
const { EmployeeDetailsModel,DepartmentDetailsModel,DepartmentModel } = sequelizeManager;
const { recoveryOptionsUtils: { getDeleteRecoveryOptions } } = require('../utils');
const { EmployeeDetailsModel } = sequelizeManager;
const { recoveryOptionsUtils: { getDeleteRecoveryOptions } } = require('../utils');

// Create Employee Details
const addEmployee = async ({
  first_name, last_name, email_id, phone_no, address, employee_id, department_id,
}) => EmployeeDetailsModel.create({
  first_name,
  last_name,
  email_id,
  phone_no,
  address,
  employee_id,
  department_id,
});

const multipleUsers = async (employees) => {
  console.log(employees);
  const data = await EmployeeDetailsModel.bulkCreate(employees);
  return data;
};

// Get Employee BY ID
const getEmployeeById = async ({ id }) => {
  const where = { id };
  const data = await EmployeeDetailsModel.findOne({
    where,
  });
  if (!data) {
    return error.throwNotFound({ custom_key: 'EmployeeNotFound', data: 'employeeDetails' });
  }
  return data;
};

// Delete Employee by ID
const deleteEmployee = async ({ force_update }) => {
  const data = await getEmployeeById({
    // eslint-disable-next-line no-undef
    id,
  });
  if (force_update) {
    return data.destroy();
  }
  if (data.status === STATUS.ENABLED) {
    return error.throwPreconditionFailed({
      message: 'Enabled employee can\'t be deleted',
      recovery: {
        message: 'do you want to force delete?',
        // eslint-disable-next-line no-undef
        options: getDeleteRecoveryOptions({ employeeId: id }, true),
      },
    });
  }
  return data.destroy();
};

// Get all Employees List
const getAllEmployee = async ({ department_id }) => {
  const where = { };

  if (department_id) {
    where.department_id = department_id;
  }
  return EmployeeDetailsModel.findAll({ where });
};

//Get all Employees List
const getAllEmployee = async ({ page_no,page_size, first_name ,department_id, min_income}) => {
  const limit = page_size;
  const offset = (page_no - 1) * limit;
  const include = [{

      model: DepartmentModel,
      include:[{
        model: DepartmentDetailsModel,
        where:{
          min_income:{
            [Op.gte]:`${min_income}`
          }}
        }],
      }];
     const where = {
        department_id:{
          [Op.eq]: `${department_id},`
        },
        first_name:{
          [Op.startsWith]:`${first_name}`,
        },
       
      };
    return EmployeeDetailsModel.findAll({ where, limit, offset, min_income});

  };

module.exports = {
  addEmployee, getEmployeeById, deleteEmployee, getAllEmployee, multipleUsers,
};
