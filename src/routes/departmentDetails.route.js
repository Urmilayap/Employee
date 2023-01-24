const express = require('express');

const {departmentDetailsController} = require('../controllers');

const departmentDetailsRoutes = express.Router({});

departmentDetailsRoutes.post('/register', departmentDetailsController.addDepartmentdetails);
departmentDetailsRoutes.get('/', departmentDetailsController.getById);


module.exports = departmentDetailsRoutes;