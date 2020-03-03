"use strict";
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model;
  class Todo extends Model {}
  Todo.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Title Cannot Be Empty"
          }
        }
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Description Cannot Be Empty"
          }
        }
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Status Cannot Be Empty"
          }
        }
      },
      due_date: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Due Date Cannot Be Empty"
          }
        }
      }
    },
    { sequelize }
  );

  Todo.associate = function(models) {
    Todo.belongsTo(models.User);
  };
  return Todo;
};
