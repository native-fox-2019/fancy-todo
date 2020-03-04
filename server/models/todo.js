'use strict';
module.exports = (sequelize, DataTypes) => {
  let Model = sequelize.Sequelize.Model;
  class Todo extends Model{}
  Todo.init({
    title: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        function(value){
          if(!value){
            throw new Error('Title is empty');
          }
        }
      }
    },

    description: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        function(value){
          if(!value){
            throw new Error('Description is empty');
          }
        }
      }
    },

    status: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        function(value){
          if(!value){
            throw new Error('Status is empty');
          }
        }
      }
    },

    due_date: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        function(value){
          if(!value){
            throw new Error('Status is empty');
          }
        }
      }
    }
  }, {sequelize})

  Todo.associate = function(models) {
    Todo.belongsTo(models.User, {foreignKey: 'userId'});
  };
  return Todo;
};