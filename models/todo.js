'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequlize = sequelize.Sequelize
  const Model = Sequlize.Model
  class Todo extends Model { }
  Todo.init({
    title:
    {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'title cant be empty'
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'description cant be empty'
        }
      }
    },
    status: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'description cant be empty'
        }
      }
    },
    due_date: {
      type: DataTypes.DATE,
      validate: {
        notEmpty: {
          msg: 'date cant be empty'
        }
      }
    }
  }, {sequelize});
  Todo.associate = function (models) {
    // associations can be defined here
    Todo.belongsTo(models.User)
  };
  return Todo;
};