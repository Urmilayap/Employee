module.exports = (sequelize, Sequelize) => sequelize.define('Department', {
    department_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      },
    department_details_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      },
    department_name: {
      type: Sequelize.STRING(255),
      allowNull: false,
      uniqueKey: true,
    },
   
  });
  