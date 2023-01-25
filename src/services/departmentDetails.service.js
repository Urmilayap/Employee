const { sequelizeManager } = require('../managers');
const { Op } = require('sequelize');
const { DepartmentDetailsModel,EmployeeDetailsModel,DepartmentModel } = sequelizeManager;

//Create Department Details
const addDepartmentdetails = async ({ min_income, max_income, description, introduced_date }) => DepartmentDetailsModel.create({
     min_income, 
     max_income, 
     description, 
     introduced_date });

//Get Department BY ID
const getById = async ({ id }) => {
     const where = { department_details_id : id};
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
       return error.throwNotFound({ custom_key: 'DepartmentNotFound', data: 'departmentdetails' });
     }
     
     return departmentdetails;
    };
  

//Get all departmentList
const getAll = async ({ page_size, page_no, min_income}) => {
  console.log({min_income});
  const limit = page_size;
  const offset = (page_no - 1) * limit; 
  const where = {
    min_income:{
      [Op.gte]: `${min_income}`,
    }
  };
 
  return DepartmentDetailsModel.findAll({  offset, limit, where });
};

     
 
 


module.exports = { addDepartmentdetails, getById, getAll};