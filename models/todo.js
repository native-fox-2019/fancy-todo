'use strict';
module.exports = (sequelize, DataTypes) => {
  const Todo = sequelize.define('Todo', {
    title:
    {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'goblok'
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      validate: {
        notEmpty:{
          msg:'dungu'
        }

      }
    },
    status: DataTypes.STRING,
    due_date: DataTypes.DATE
  }, {});
  Todo.associate = function (models) {
    // associations can be defined here
  };
  return Todo;
};