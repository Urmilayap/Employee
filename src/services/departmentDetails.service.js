const { sequelizeManager } = require('../managers');
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
 


module.exports = { addDepartmentdetails,getById};