const express = require('express');

const {employeeDetailsController} = require('../controllers');
const { checkEmployeeDetails }  = require('../middlewares/employeeDetails-validator.middleware');


const employeeDetailsRoutes = express.Router({});

employeeDetailsRoutes.post('/register', checkEmployeeDetails ,employeeDetailsController.addEmployee);
employeeDetailsRoutes.post('/', employeeDetailsController.multipleUsers);
employeeDetailsRoutes.get('/',employeeDetailsController.getAllEmployee);
employeeDetailsRoutes.get('/:employeeId/',employeeDetailsController.getEmployeeById);
employeeDetailsRoutes.delete('/:employeeId/',employeeDetailsController.deleteEmployee);
employeeDetailsRoutes.put('/:employeeId/',employeeDetailsController.updateEmployee);



module.exports = employeeDetailsRoutes;  