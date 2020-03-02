'use strict';
module.exports = (sequelize, DataTypes) => {
  const Todo = sequelize.define('Todo', {
    title: {
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        customValidator(value) {
          if (value == "" || null){
            throw new Error (`Title cannot be empty`)
          }
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        customValidator(value) {
          if (value == "" || null){
            throw new Error (`Description cannot be empty`)
          }
        }
      }
    },
    status: DataTypes.BOOLEAN,
    due_date: {
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        customValidator(value) {
          if (value == "" || null){
            throw new Error (`Due date cannot be empty`)
          }
        }
      }
    }
  }, {});
  Todo.associate = function(models) {
    // associations can be defined here
  };
  return Todo;
};