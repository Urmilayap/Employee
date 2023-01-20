const express = require('express');

const {departmentDetailsController} = require('../controllers');

const departmentDetailsRoutes = express.Router({});

departmentDetailsRoutes.post('/register', departmentDetailsController.addDepartmentdetails);


module.exports = departmentDetailsRoutes;