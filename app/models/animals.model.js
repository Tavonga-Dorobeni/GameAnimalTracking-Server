module.exports = (sequelize, Sequelize) => {
    const Animal = sequelize.define("animal", {
      AnimalID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      Name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      Species: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      Age: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      Condition: {
        type: Sequelize.STRING,
        allowNull: true
      },
      Monitor: {
        type: Sequelize.INTEGER(1),
        allowNull: false,
        defaultValue: 0
      }
    });
  
    return Animal;
  };
  