

module.exports = (sequelize, Sequelize) => sequelize.define('Department', {
    department_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      },
    department_details_id: {
      type: Sequelize.INTEGER,
      },
    department_name: {
      type: Sequelize.STRING(255),
      uniqueKey: true,
    },
   
  });
  