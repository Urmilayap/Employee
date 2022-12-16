//onst { STATUS, VERSION } = require('../consts');

module.exports = (sequelize, Sequelize) => sequelize.define('employee', {
  employee_id: {
    type: Sequelize.INTEGER,
    autoIncrement:true,
    primaryKey:true,
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
  phone_no: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  address: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
  
  
 
});
