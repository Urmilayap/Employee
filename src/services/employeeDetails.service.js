const yapUtil = require('@yapsody/lib-utils');
const { error } = require('@yapsody/lib-handlers');
const { Op ,ids, search ,sort_by ,sort_order} = require('sequelize');
const { STATUS } = require('../consts');
const { sequelizeManager } = require('../managers');
const {employeeDetailsModel} = sequelizeManager;
const { recoveryOptionsUtils: { getDeleteRecoveryOptions } } = require('../utils');

//Create Employee Details
const addEmployee = async ({ first_name,last_name,email_id,phone_no,address,employee_id, department_id }) => employeeDetailsModel.create({
   first_name,
   last_name,
   email_id,
   phone_no,
   address,
   employee_id,
   department_id
  });

  const multipleUsers = async (employees) => { 
    console.log(employees);
   const data =  await employeeDetailsModel.bulkCreate(employees)
   return data;

};
 

//Get Employee BY ID
  const getEmployeeById = async ({ id }) => {
   const where = { id };
   const data = await employeeDetailsModel.findOne({
     where,
   });
   if (!data) {
     return error.throwNotFound({ custom_key: 'EmployeeNotFound', data: 'employeeDetails' });
   }
   return data;
 };

//Delete Employee by ID
 const deleteEmployee = async ({ id, force_update }) => {
   const data = await getEmployeeById({
     id
   });
   if (force_update) {
     return data.destroy();
   }
   if (data.status === STATUS.ENABLED) {
     return error.throwPreconditionFailed({
       message: 'Enabled employee can\'t be deleted',
       recovery: {
         message: 'do you want to force delete?',
         options: getDeleteRecoveryOptions({ employeeId: id }, true),
       },
     });
   }
   return data.destroy();
   
  };

//Get all Employees List
const getAllEmployee = async ({ department_id }) => {
  const where = {};

   if (department_id) {
    where.department_id = department_id 
    };
   
   return employeeDetailsModel.findAll({ where });
  };

  module.exports = {addEmployee ,getEmployeeById ,deleteEmployee ,getAllEmployee, multipleUsers} ;