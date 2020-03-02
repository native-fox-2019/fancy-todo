'use strict';
module.exports = (sequelize, DataTypes) => {

  const Model = sequelize.Sequelize.Model
  class Todo extends Model {}

  Todo.init({
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Please insert a task title'
        }
      }
    },
    description: DataTypes.STRING,
    status: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Please insert a status'
        }
      }
    },
    due_date: DataTypes.DATE,
  }, {sequelize});

  Todo.associate = function(models) {
    // associations can be defined here
  };
  return Todo;
};