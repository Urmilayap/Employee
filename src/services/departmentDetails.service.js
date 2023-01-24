const { sequelizeManager } = require('../managers');
const { DepartmentDetailsModel } = sequelizeManager;

//Create Department Details
const addDepartmentdetails = async ({ min_income, max_income, description, introduced_date }) => DepartmentDetailsModel.create({
     min_income, 
     max_income, 
     description, 
     introduced_date });


module.exports = { addDepartmentdetails};