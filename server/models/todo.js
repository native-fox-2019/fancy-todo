'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class Todo extends Model { }
  Todo.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          args: true,
          msg: 'title can not be empty!'
        },
        notEmpty: {
          args: true,
          msg: 'title can not be empty!'
        }
      }
    },

    description:
    {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'description can not be empty!'
        },
        notEmpty: {
          args: true,
          msg: 'description can not be empty!'
        }
      }
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'status can not be empty!'
        },
        notEmpty: {
          args: true,
          msg: 'status can not be empty!'
        }
      }
    },
    due_date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'due date can not be empty!'
        },
        notEmpty: {
          args: true,
          msg: 'due date can not be empty!'
        }
      }
    },
    UserId: DataTypes.INTEGER

  }, {
    hooks: {
      beforeCreate(todo, options) {
        let date = todo.due_date.toISOString().slice(0,10)
        todo.due_date = date
      }
    },
    sequelize
  });
  Todo.associate = function (models) {
    Todo.belongsTo(models.User)
  };
  return Todo;
};