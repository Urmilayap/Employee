const { Op } = require('sequelize');
const { sequelizeManager } = require('../managers');

const { DepartmentDetailsModel, DepartmentModel, EmployeeDetailsModel } = sequelizeManager;

// Create Department Details
const addDepartmentdetails = async ({
  min_income, max_income, description, introduced_date,
}) => DepartmentDetailsModel.create({
  min_income,
  max_income,
  description,
  introduced_date,
});

const getAllDepartmentdetails = async () => DepartmentDetailsModel.findAll();

// Get all departmentList
const getAll = async ({ page_size, page_no, min_income }) => {
  console.log({ min_income });
  const limit = page_size;
  const offset = (page_no - 1) * limit;
  const include = [{
    model: DepartmentModel,
    include: {
      model: EmployeeDetailsModel,
    },
  }];
  const where = {
    min_income: {
      [Op.eq]: `${min_income}`,
    },

  };
  return DepartmentDetailsModel.findAll({
    offset, limit, where, include,
  });
};

// Get Department BY ID
const getById = async ({ id }) => {
  const where = { department_details_id: id };
  console.log(where);
  const departmentdetails = await DepartmentDetailsModel.findOne({
    where,
    include: [
      {

        model: DepartmentModel,
      },
    ],
  });
  if (!departmentdetails) {
    // eslint-disable-next-line no-undef
    return error.throwNotFound({ custom_key: 'DepartmentNotFound', data: 'departmentdetails' });
  }

  return departmentdetails;
};

module.exports = {
  addDepartmentdetails, getAllDepartmentdetails, getById, getAll,
};
