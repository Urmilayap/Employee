const express = require('express');
const apiRoutes = express.Router();
const { error } = require('@yapsody/lib-handlers');
const {  validationResult } = require("express-validator");

const employeeDetailsRoutes = require('./employeeDetails.route');
const departmentRoutes = require('./department.route');


apiRoutes.use('/employees', employeeDetailsRoutes);
apiRoutes.use('/departments', departmentRoutes);

apiRoutes.use('*', () => error.throwNotFound({ item: 'Route' }));


module.exports = { apiRoutes }
