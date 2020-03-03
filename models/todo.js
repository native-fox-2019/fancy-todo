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
    description: {
      type: DataTypes.STRING,
      validate: 
      {
        notEmpty: {
          msg: 'Please input the description'
        }
      }
    },
    status: DataTypes.STRING,
    due_date: DataTypes.DATE
  }, { sequelize })

  Todo.associate = function(models) {
    // associations can be defined here
    Todo.belongsTo(models.User, {foreignKey: 'UserId'})
  };
  return Todo;
};