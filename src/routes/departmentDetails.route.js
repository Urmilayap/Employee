const express = require('express');

const { departmentDetailsController } = require('../controllers');

const departmentDetailsRoutes = express.Router({});

departmentDetailsRoutes.post('/register', departmentDetailsController.addDepartmentdetails);
departmentDetailsRoutes.get('/:departmentdetailsId/', departmentDetailsController.getById);
departmentDetailsRoutes.get('/', departmentDetailsController.getAll);
departmentDetailsRoutes.put('/', departmentDetailsController.updateDepartmentdetails);

module.exports = departmentDetailsRoutes;
