module.exports = (sequelize, Sequelize) => sequelize.define('department', {
    department_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      },
    departmentdetails_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      },
    department_name: {
      type: Sequelize.STRING(255),
      allowNull: false,
      uniqueKey: true,
    },
   
  });
  