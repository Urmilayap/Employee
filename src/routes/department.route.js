const express = require('express');

const { departmentController } = require('../controllers');

const departmentRoutes = express.Router({});

departmentRoutes.post('/register', departmentController.addDepartment);
departmentRoutes.get('/', departmentController.getAll);
departmentRoutes.get('/:departmentId/', departmentController.getById);
departmentRoutes.delete('/:departmentId/', departmentController.deleteDepartment);
departmentRoutes.put('/:departmentId', departmentController.updateDepartment);

module.exports = departmentRoutes;
