const yapUtil = require('@yapsody/lib-utils');
const { error } = require('@yapsody/lib-handlers');
const { Op ,ids, search ,sort_by ,sort_order} = require('sequelize');
const { STATUS } = require('../consts');
const { sequelizeManager } = require('../managers');
const {employeeDetailsModel} = sequelizeManager;
const { recoveryOptionsUtils: { getDeleteRecoveryOptions } } = require('../utils');

//Create Employee Details
const addEmployee = async ({ first_name,last_name,email_id,phone_no,address,employee_id }) => employeeDetailsModel.create({
   first_name,
   last_name,
   email_id,
   phone_no,
   address,
   employee_id
  });

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
const getAllEmployee = async ({ first_name,
   last_name,
   email_id,
   phone_no,
   address,
   id,
   employee_id
   }) => {
   const where = { ids };
   if (ids) {
     where.id = ids;
   }
   if (search) {
     where.first_name = {
       [Op.like]: `%${search}%`,
     };
   }
   const order = [];
   order.push([sort_by, sort_order]);
   return employeeDetailsModel.findAll({
      first_name,
      last_name,
      email_id,
      phone_no,
      address,
      id,
      employee_id
   });
 };

  module.exports = {addEmployee ,getEmployeeById ,deleteEmployee ,getAllEmployee } ;