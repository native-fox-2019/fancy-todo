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
          msg: 'title can not be empty!'
        },
        notEmty: {
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
          msg: 'description can not be empty!'
        },
        notEmty: {
          msg: 'description can not be empty!'
        }
      }
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'status can not be empty!'
        },
        notEmty: {
          msg: 'status can not be empty!'
        }
      }
    },
    due_date: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, { sequelize });
  Todo.associate = function (models) {
    // associations can be defined here
  };
  return Todo;
};