const yapUtil = require('@yapsody/lib-utils');
const { error } = require('@yapsody/lib-handlers');
const { Op ,ids, search ,sort_by ,sort_order} = require('sequelize');
const { STATUS } = require('../consts');
const { sequelizeManager } = require('../managers');
const {employeeDetailsModel} = sequelizeManager;
const { recoveryOptionsUtils: { getDeleteRecoveryOptions } } = require('../utils');

//>>>>>>>>>>>
const addEmployee = async ({ first_name,last_name,email_id,phone_no,address }) => employeeDetailsModel.create({
   first_name,
   last_name,
   email_id,
   phone_no,
   address
  });

//>>>>>>>>>>>>>>>>
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

//>>>>>>>>>>>>>>>>>>>
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

//>>>>>>>>>>>>>>>>>>>>
const getAllEmployee = async ({ first_name,
   last_name,
   email_id,
   phone_no,
   address,
   id
   }) => {
   // const limit = page_size;
   // const offset = (page_no - 1) * limit;
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
      id
   });
 };

//  const enableOne = async ({ id }) => {
//   const item = await getEmployeeById({
//     id,
//   });
//   if (item.status !== STATUS.DISABLED) {
//     throw error.throwPreconditionFailed({ message: 'Only disabled employees can be enabled' });
//   }

//   item.status = STATUS.ENABLED;
//   item.version += 1;
//   return item.save();
// };


// const disableOne = async ({ id }) => {
//   const item = await getEmployeeById({
//     id,
//   });

//   if (item.status !== STATUS.ENABLED) {
//     throw error.throwPreconditionFailed({ message: 'Only enabled employees can be disabled' });
//   }

//   item.status = STATUS.DISABLED;
//   item.version += 1;
//   return item.save();
// };
  
  module.exports = {addEmployee ,getEmployeeById ,deleteEmployee ,getAllEmployee } ;