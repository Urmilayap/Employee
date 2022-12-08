const express = require('express');

const {employeeDetailsController} = require('../controllers');

const employeeDetailsRoutes = express.Router({});

employeeDetailsRoutes.post('/register',employeeDetailsController.addEmployee);
employeeDetailsRoutes.get('/',employeeDetailsController.getAllEmployee);
employeeDetailsRoutes.get('/:employeeId/',employeeDetailsController.getEmployeeById);
employeeDetailsRoutes.delete('/:employeeId/',employeeDetailsController.deleteEmployee);
employeeDetailsRoutes.put('/:employeeId/',employeeDetailsController.updateEmployee);



module.exports = employeeDetailsRoutes; 