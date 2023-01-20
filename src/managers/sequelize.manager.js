const Sequelize = require('sequelize');
const { Employee,Department,Department_Details} = require('../models');
const config = require('../config');

const sequelize = new Sequelize(config.MYSQL_DB_NAME, config.MYSQL_USERNAME, config.MYSQL_PASSWORD, {
  host: config.MYSQL_HOST,
  port: config.MYSQL_PORT,
  dialect: 'mysql',
  logging: true,
  dialectOptions: {
    charset: 'utf8mb4',
  },
  define: {
    underscored: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    paranoid: false,
  },
});

const EmployeeDetailsModel = Employee(sequelize, Sequelize);
const DepartmentModel = Department(sequelize,Sequelize);
const DepartmentDetailsModel = Department_Details(sequelize,Sequelize);

DepartmentModel.hasMany(EmployeeDetailsModel, { foreignKey: 'department_id' });
EmployeeDetailsModel.belongsTo(DepartmentModel, { foreignKey: 'department_id' });

DepartmentDetailsModel.hasMany(DepartmentModel,{ foreignKey: 'departmentdetails_id'});
DepartmentModel.belongsTo(DepartmentDetailsModel,{ foreignKey: 'departmentdetails_id'});


module.exports = {
  sequelize,
  EmployeeDetailsModel,
  DepartmentModel,
  DepartmentDetailsModel
};
