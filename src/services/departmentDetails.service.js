const { sequelizeManager } = require('../managers');
const { DepartmentDetailsModel } = sequelizeManager;

//Create Department Details
const addDepartmentdetails = async ({ min_income, max_income, description, introduced_date }) => DepartmentDetailsModel.create({
     min_income, 
     max_income, 
     description, 
     introduced_date });

const getAllDepartmentdetails = async () => {
     return DepartmentDetailsModel.findAll();
     };


//Get all departmentList
const getAll = async ({ page_size, page_no, min_income}) => {
  console.log({min_income});
  const limit = page_size;
  const offset = (page_no - 1) * limit; 
  const where = {
    min_income:{
      [Op.eq]: `${min_income}`,
    }
  };
 
  return DepartmentDetailsModel.findAll({  offset, limit, where });
};

     
 
 


module.exports = { addDepartmentdetails, getById, getAll};
