//onst { STATUS, VERSION } = require('../consts');

module.exports = (sequelize, Sequelize) => sequelize.define('employee', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  employee_id: {
    type: Sequelize.INTEGER,
    foreignKey: true,
    allowNull: true,
  },
  department_id: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  phone_no: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  first_name: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
  last_name: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
  email_id: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
  address: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
  
  
 
});
