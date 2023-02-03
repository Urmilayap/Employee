const { error } = require('@yapsody/lib-handlers');
const { Op } = require('sequelize');
const { sequelizeManager } = require('../managers');

const { EmployeeDetailsModel, DepartmentDetailsModel, DepartmentModel } = sequelizeManager;

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
const deleteEmployee = async ({ min_income, force_update }) => {
  // eslint-disable-next-line no-undef
  const employee = await EmployeeDetailsModel.findAll({
    include: [
      {
        module: DepartmentModel,
        include: [DepartmentDetailsModel],
        where: {
          min_income: {
            [Op.eq]: `${min_income}`,
          },
        },
      },
    ],
  });
  console.log('-------->', employee);

  if (force_update) {
    return employee.destroy();
  }

  return employee.destroy();
};

// Get all Employees List
const getAllEmployees = async ({
  page_no, page_size, first_name, department_id, min_income,
}) => {
  const limit = page_size;
  const offset = (page_no - 1) * limit;
  const include = [{

    model: DepartmentModel,
    include: [{
      model: DepartmentDetailsModel,
      where: {
        min_income: {
          [Op.gte]: `${min_income}`,
        },
      },
    }],
  }];
  const where = {
    department_id: {
      [Op.eq]: `${department_id},`,
    },
    first_name: {
      [Op.startsWith]: `${first_name}`,
    },
  };

  return EmployeeDetailsModel.findAll({
    where, limit, offset, min_income, include,
  });
};

module.exports = {
  addEmployee, getEmployeeById, getAllEmployees, multipleUsers, deleteEmployee,
};
