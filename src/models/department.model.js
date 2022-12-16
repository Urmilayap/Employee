module.exports = (sequelize, Sequelize) => sequelize.define('department', {
    department_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      },
    employee_id: {
        type: Sequelize.INTEGER,
        },
    department_name: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
   
  });
  