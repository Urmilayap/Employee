const Sequelize = require('sequelize');
const { Employee,Department,DepartmentDetails} = require('../models');
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
const DepartmentDetailsModel = DepartmentDetails(sequelize,Sequelize);

DepartmentModel.hasMany(EmployeeDetailsModel, { foreignKey: 'department_id' });
EmployeeDetailsModel.belongsTo(DepartmentModel, { foreignKey: 'department_id' });

DepartmentDetailsModel.hasMany(DepartmentModel,{ foreignKey: 'department_details_id'});
DepartmentModel.belongsTo(DepartmentDetailsModel,{ foreignKey: 'department_details_id'});




module.exports = {
  sequelize,
  EmployeeDetailsModel,
  DepartmentModel,
  DepartmentDetailsModel
};
