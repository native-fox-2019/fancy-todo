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
      allowNull: false,
      validate: {
        notNull: {
          msg: `Status must be filled`
        }
      }
    },
    due_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isDate: {
          msg: `Invalid Date format`
        },
        notNull: {
          msg: `Date must be filled`
        }
      }
    }
  }, { sequelize });

  Todolist.associate = function (models) {
    // associations can be defined here
    Todolist.belongsTo(models.User)
  };
  return Todolist;
};