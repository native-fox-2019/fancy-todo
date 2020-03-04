'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model=sequelize.Sequelize.Model;
  const authenticate=require('../google-auth');

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
    },
    start_date: {
      type:DataTypes.DATE,
      validate:{
        notEmpty:{
          msg:'start_date cannot be empty'
        }
      }
    },
    userId:{
      type:DataTypes.INTEGER
    },
    g_id:{
      type:DataTypes.STRING
    }
  }, {sequelize,modelName:'Todo'});


  Todo.associate = function(models) {
    // associations can be defined here
    Todo.belongsTo(models.User,{foreignKey:'userId'});

  };

  return Todo;
};