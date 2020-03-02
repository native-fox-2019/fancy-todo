'use strict';
module.exports = (sequelize, DataTypes) => {

  const Sequelize = sequelize.Sequelize;
  const Model = Sequelize.Model;

  class Todo extends Model{}

  Todo.init({
    title: {
      type: DataTypes.STRING,
      validate: 
      {
        notEmpty: {
          msg: 'Please input the title'
        }
      }
    },
    description: DataTypes.STRING,
    status: DataTypes.STRING,
    due_date: DataTypes.DATE
  }, { sequelize })

  // var Todo = sequelize.define('Todo', {
  //   title: DataTypes.STRING,
  //   description: DataTypes.STRING,
  //   status: DataTypes.STRING,
  //   due_date: DataTypes.DATE
  // }, {});
  Todo.associate = function(models) {
    // associations can be defined here
  };
  return Todo;
};