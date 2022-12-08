const express = require('express');
const apiRoutes = express.Router();
const { error } = require('@yapsody/lib-handlers');
const employeeDetailsRoutes = require('./employeeDetails.route');

apiRoutes.use('/employees', employeeDetailsRoutes);
apiRoutes.use('*', () => error.throwNotFound({ item: 'Route' }));


module.exports = apiRoutes;
