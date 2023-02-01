const express = require('express');

const {departmentDetailsController} = require('../controllers');

const departmentDetailsRoutes = express.Router({});

departmentDetailsRoutes.post('/register', departmentDetailsController.addDepartmentdetails);
departmentDetailsRoutes.get('/', departmentDetailsController.getAllDepartmentdetails);


module.exports = departmentDetailsRoutes;