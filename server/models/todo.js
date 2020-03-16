'use strict';
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize

  class Todo extends Model {

  }

  Todo.init({
    title: {
      type: DataTypes.STRING,
      validate : {
        notEmpty: {
          msg: 'title cannot be empty'
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      validate : {
        notEmpty: {
          msg: 'description cannot be empty'
        }
      }
    },
    status: {
      type: DataTypes.STRING,
      validate : {
        notEmpty: {
          msg: 'title cannot be empty'
        }
      }
    },
    due_date: {
      type: DataTypes.DATE,
      validate : {
        notEmpty: {
          msg: 'Date cannot be empty'
        },
        isDate : {
          msg: 'Enter valid date,format: YYYY/MM/DD'
        }
      }
    },   
  },
  {
    hooks: {
      beforeSave: (Todo, options) =>{
        if(Todo.status !== 'Compelete'){
          Todo.status = 'Incomplete'
        }
      }
    },
    sequelize 
  })



  Todo.associate = function(models) {
    Todo.belongsTo(models.User, { foreignKey: 'userId' })
  };
  return Todo;
};