const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class Events extends Model {}

Events.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    event_name: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: true 
      }
    },
    description: {
      type: DataTypes.STRING,
      defaultValue: 'no description'
    },
    date_created: {
      type: DataTypes.DATE,
      allowNull: true,
      // defaultValue: DataTypes.NOW, //also do for date_updated//Mike
    },
    total_cost: {
      type: DataTypes.INTEGER,
      // or FLOAT
      allowNull: true,
    },
  },
  {
    sequelize,
    // timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'Events', 
  }
);

module.exports = Events;
