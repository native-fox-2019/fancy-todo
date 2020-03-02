'use strict';
module.exports = (sequelize, DataTypes) => {

  

  const Todo = sequelize.define('Todo', {
    
    title: {
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
          msg:'title cannot be an empty space'
        }
      }
    },
    description: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          msg:'description cannot be an empty space'
        }
      }
    },
    status: {
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
          msg:"Status must be filled"
        }
      }
    },
    due_date: {
      type:DataTypes.DATE,
    validate:{
        notEmpty:{
          msg:"date must be filled"
        }
    }
  }
  }, {});
  Todo.associate = function(models) {
    // associations can be defined here
  };
  return Todo;
};