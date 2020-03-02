'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model=sequelize.Sequelize.Model;

  class Todo extends Model{}

  Todo.init({
    title: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          msg:'Title cannot be empty'
        }
      }
    },
    description: {
      type:DataTypes.TEXT,
      validate:{
        notEmpty:{
          msg:'Description cannot be empty'
        }
      }
    },
    status: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          msg:'Status cannot be empty'
        }
      }
    },
    due_date: {
      type:DataTypes.DATE,
      validate:{
        notEmpty:{
          msg:'due_date cannot be empty'
        }
      }
    }
  }, {sequelize,modelName:'Todo'});


  Todo.associate = function(models) {
    // associations can be defined here
  };

  return Todo;
};