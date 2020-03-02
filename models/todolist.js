'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model

  class Todolist extends Model { }

  Todolist.init({
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: `Title must not be empty`
        }
      }
    },
    description: DataTypes.TEXT,
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    due_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isDate: {
          msg: `Invalid Date format`
        }
      }
    }
  }, { sequelize });

  Todolist.associate = function (models) {
    // associations can be defined here
  };
  return Todolist;
};