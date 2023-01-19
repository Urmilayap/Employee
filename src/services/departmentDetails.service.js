const yapUtil = require('@yapsody/lib-utils');
const { error } = require('@yapsody/lib-handlers');
const { Op } = require('sequelize');
const { STATUS } = require('../consts');
const { sequelizeManager } = require('../managers');
const {departmentModel,employeeDetailsModel,departmentDetailsModel} = sequelizeManager;
const { recoveryOptionsUtils: { getDeleteRecoveryOptions } } = require('../utils');

//Create Department Details
const addDetails = async ({ department_id, min_income, max_income, description, introduced_date }) => departmentDetailsModel.create({ 
    department_id, min_income, max_income, description, introduced_date });


module.exports = { addDetails };