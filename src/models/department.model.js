module.exports = (sequelize, Sequelize) => sequelize.define('department', {
    department_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    department_name: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
   
  });
  