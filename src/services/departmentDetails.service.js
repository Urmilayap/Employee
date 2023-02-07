const { Op } = require('sequelize');
const { sequelizeManager } = require('../managers');

const { DepartmentDetailsModel, DepartmentModel } = sequelizeManager;

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

// Get Department BY ID
const getById = async ({ department_details_id }) => {
  // const where = { department_details_id: id };
  // console.log(where);
  const departmentdetails = await DepartmentDetailsModel.findOne({
    where: {
      department_details_id: {
        [Op.eq]: `${department_details_id}`,
      },
    },
    // include: [
    //   {

    //     model: DepartmentModel,
    //   },
    // ],
  });
  // if (!departmentdetails) {
  //   // eslint-disable-next-line no-undef
  //   return error.throwNotFound({ custom_key: 'DepartmentNotFound', data: 'departmentdetails' });
  // }

  return departmentdetails;
};

// Get all departmentList
const getAll = async ({
  page_no, page_size, min_income,
}) => {
  const limit = page_size;
  const offset = (page_no - 1) * limit;
  const include = [{
    model: DepartmentModel,
  }];
  const where = {
    // department_details_id: {
    //   [Op.eq]: `${department_details_id}`,
    // },
    // department_id: {
    //   [Op.eq]: `${department_id}`,
    // },
    min_income: {
      [Op.eq]: `${min_income}`,
    },

  };
  return DepartmentDetailsModel.findAll({
    where, offset, include,
  });
};

module.exports = {
  addDepartmentdetails, getById, getAll, getAllDepartmentdetails,
};
