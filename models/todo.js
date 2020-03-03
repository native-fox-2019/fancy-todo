'use strict';
module.exports = (sequelize, DataTypes) => {
  const Todo = sequelize.define('Todo', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { args: true, msg: 'title cannot be empty!' },
        notNull: {
          msg: 'title cannot be empty!'
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { args: true, msg: 'description cannot be empty!' },
        notNull: {
          msg: 'description cannot be empty!'
        }
      }
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { args: true, msg: 'status cannot be empty!' },
        notNull: {
          msg: 'status cannot be empty!'
        }
      }
    },
    due_date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: { args: true, msg: 'due_date cannot be empty!' },
        notNull: {
          msg: 'due_date cannot be empty!'
        }
      }
    },
    UserId: {
      type: DataTypes.INTEGER
      // allowNull: false,
      // validate: {
      //   notEmpty: { args: true, msg: 'due_date cannot be empty!' },
      //   notNull: {
      //     msg: 'due_date cannot be empty!'
      //   }
      // }
    }
  }, {});
  Todo.associate = function(models) {
    // associations can be defined here
    Todo.belongsTo(models.User);
  };
  return Todo;
};