'use strict';
module.exports = (sequelize, DataTypes) => {
  const models = sequelize.Sequelize.Model
  class Todo extends models { }
  Todo.init({
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty:{
          msg: 'Title must be filled'
        }
      }
    },
    description: DataTypes.TEXT,
    status: {
      type: DataTypes.BOOLEAN,
      allowNull:false
    },
    due_date: {
      type: DataTypes.DATEONLY,
      validate: {
        isDate: {
          msg: 'Date must be date'
        }
      },
      allowNull:false
    },
    UserId: {
      type: DataTypes.INTEGER
    }

  }, { sequelize })

  // const Todo = sequelize.define('Todo', {
  //   title: DataTypes.STRING,
  //   description: DataTypes.TEXT,
  //   status: DataTypes.BOOLEAN,
  //   due_date: DataTypes.DATEONLY
  // }, {});
  Todo.associate = function (models) {
    // associations can be defined here
    Todo.belongsTo(models.User)
  };
  return Todo;
};