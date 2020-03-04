'use strict';
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize

  class Todo extends Model {

  }

  Todo.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    status: DataTypes.STRING,
    due_date: DataTypes.DATE    
  },
  {
    hooks: {
      
    },
    sequelize 
  })



  Todo.associate = function(models) {
    Todo.belongsTo(models.User, { foreignKey: 'userId' })
  };
  return Todo;
};