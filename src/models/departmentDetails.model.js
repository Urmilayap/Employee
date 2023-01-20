module.exports = (sequelize, Sequelize) => sequelize.define('Department_Details', {
    
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
    min_income: {
        type: Sequelize.INTEGER,
        allowNull: false,
        },
    max_income: {
        type: Sequelize.INTEGER,
        allowNull: false,
        },
    introduced_date:{
        type: Sequelize.DATEONLY,
        allowNull:false
        },
    description: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
   
  });
  