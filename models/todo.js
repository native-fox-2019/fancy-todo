'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model
  class Todo extends Model{}
  Todo.init({
    title: {
      type: Sequelize.STRING,
      //notEmpty: true,
      validate: {notEmpty: true}
    }, 
    description: {
      type: Sequelize.STRING,
      validate: {notEmpty: true}
    },
    status: {
      type : Sequelize.STRING,
      validate: {notEmpty: true}
    },
    due_date: {
      type: Sequelize.STRING,
      validate: {notEmpty: true}
    } 
  }, {sequelize})
  Todo.associate = function(models) {
    // associations can be defined here
  };
  return Todo;
}

  /*
  const Todo = sequelize.define('Todo', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    status: DataTypes.STRING,
    due_date: DataTypes.STRING
  }, {});
  Todo.associate = function(models) {
    // associations can be defined here
  };
  return Todo;
};
*/