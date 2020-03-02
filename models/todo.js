'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model
  class Todo extends Model{}
  Todo.init({
    title: {
      type: DataTypes.STRING,
      notEmpty: true
    }, 
    description: {
      type: DataTypes.STRING,
      notEmpty : true
    },
    status: {
      type : DataTypes.STRING,
      notEmpty: true 
    },
    due_date: {
      type: DataTypes.STRING,
      notEmpty: true 
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