module.exports = (sequelize, Sequelize) => {
    const AnimalLocations = sequelize.define("tbl_gps", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      AnimalID: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      lat: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      lng: {
        type: Sequelize.FLOAT,
        allowNull: false
      }
    });
  
    return AnimalLocations;
  };
  