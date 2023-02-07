const { error } = require('@yapsody/lib-handlers');
const { Op } = require('sequelize');
const { STATUS } = require('../consts');
const { sequelizeManager } = require('../managers');

const { DepartmentModel, DepartmentDetailsModel } = sequelizeManager;
const { recoveryOptionsUtils: { getDeleteRecoveryOptions } } = require('../utils');

// Create Department
const addDepartment = async ({ department_name, department_details_id }) => DepartmentModel.create({
  department_name,
  department_details_id,
});

// Get Department BY ID
const getById = async ({ department_id }) => {
  const department = await DepartmentModel.findOne({
    where: {
      department_id: `${department_id}`,
    },
    // include: [
    //   {
    //     model: EmployeeDetailsModel,
    //   },
    // ],
    include: [
      {
        model: DepartmentDetailsModel,
      },
    ],
  });
  // if (!department) {
  //   return error.throwNotFound({ custom_key: 'DepartmentNotFound', data: 'departments' });
  // }

  return department;
};

// Get all departmentList
const getAll = async ({ min_income }) => {
  console.log(min_income);
  const include = [{
    // model: [EmployeeDetailsModel],

    // include: [{
    model: DepartmentDetailsModel,
    where: {
      min_income: {
        [Op.eq]: `${min_income}`,
      },

    },
  }];
  // }];
  // const where = {
  //   min_income: {
  //     [Op.eq]: `${min_income}`,
  //   },
  // };
  return DepartmentModel.findAll({ include });
};

// Delete department by ID
const deleteDepartment = async ({ id, force_update }) => {
  const data = await getById({
    id,
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

// Get all departmentList
const getAlls = async ({ page_size, page_no, min_income }) => {
  console.log({ min_income });
  const limit = page_size;
  const offset = (page_no - 1) * limit;

  const include = {
    model: DepartmentDetailsModel,
  };

  const where = {
    min_income: {
      [Op.gte]: `${min_income}`,
    },
  };
  return DepartmentModel.findAll({
    offset, limit, where, include,
  });
};

module.exports = {
  addDepartment, getById, deleteDepartment, getAll, getAlls,
};
