'use strict';
module.exports = (sequelize, DataTypes) => {

  const Model = sequelize.Sequelize.Model
  class Task extends Model { }

  Task.init({
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Please insert a task title'
        }
      }
    },
    description: DataTypes.STRING,
    status: DataTypes.STRING,
    deadline: DataTypes.DATE,
    UserId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: 'id',
      }
    },
    ProjectId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Project',
        key: 'id',
      }
    },
  }, { sequelize });

  Task.associate = function (models) {
    Task.belongsTo(models.User)
    Task.belongsTo(models.Project)
    // associations can be defined here
  };
  return Task;
};