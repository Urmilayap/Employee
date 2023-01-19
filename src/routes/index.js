const express = require('express');
const apiRoutes = express.Router();
const { error } = require('@yapsody/lib-handlers');


const employeeDetailsRoutes = require('./employeeDetails.route');
const departmentRoutes = require('./department.route');
const departmentDetailsRoutes =  require('./departmentDetails.route');


apiRoutes.use('/employees', employeeDetailsRoutes);
apiRoutes.use('/departments', departmentRoutes);
apiRoutes.use('/departmentDetails', departmentDetailsRoutes);


apiRoutes.use('*', () => error.throwNotFound({ item: 'Route' }));


module.exports =  apiRoutes ;
