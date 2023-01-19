const Sequelize = require('sequelize');
const { employee,department,departmentDetails} = require('../models');
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

const employeeDetailsModel = employee(sequelize, Sequelize);
const departmentModel = department(sequelize,Sequelize);
const departmentDetailsModel = departmentDetails(sequelize,Sequelize);

departmentModel.hasMany(employeeDetailsModel, { foreignKey: 'department_id' });
employeeDetailsModel.belongsTo(departmentModel, { foreignKey: 'department_id' });

departmentDetailsModel.hasMany(departmentModel,{ foreignKey: 'departmentdetails_id'});
departmentModel.belongsTo(departmentDetailsModel,{ foreignKey: 'departmentdetails_id'});


module.exports = {
  sequelize,
  employeeDetailsModel,
  departmentModel,
  departmentDetailsModel
};
