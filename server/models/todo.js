'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model
  class Todo extends Model {}

  Model.init(
    {
    title: {
      type : DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Please enter the title!'
        }
      }
    },
    description: {
      type : DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Please enter the description!'
        }
      }
    },
    status: DataTypes.STRING,
    due_date: DataTypes.DATE
  }, {sequelize,tableName:'Todos'}
  )

  Todo.associate = function(models) {
    // associations can be defined here
    Todo.belongsTo(models.User,{foreignKey:'userId'})
  };
  return Todo;
};