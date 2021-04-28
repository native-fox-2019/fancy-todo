'use strict';
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize

  class Todo extends Model { }
  
  Todo.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Title cannot be empty.'
        },
        notNull: {
          args: true,
          msg: 'Title cannot be null.'
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Description cannot be empty.'
        },
        notNull: {
          args: true,
          msg: 'Description cannot be null.'
        }
      }
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Status cannot be empty.'
        },
        notNull: {
          args: true,
          msg: 'Status cannot be null.'
        }
      }
    },
    due_date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Due_Date cannot be empty.'
        },
        notNull: {
          args: true,
          msg: 'Due_Date cannot be null.'
        }
      }
    },
  }, { sequelize });
  
  Todo.associate = function(models) {
    // associations can be defined here
    Todo.belongsTo(models.User)
  };
  return Todo;
};