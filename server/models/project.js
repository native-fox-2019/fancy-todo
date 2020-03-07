'use strict';
module.exports = (sequelize, DataTypes) => {

  const Model = sequelize.Sequelize.Model
  class Project extends Model { }

  Project.init({
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Please insert a project title'
        }
      }
    },
    description: DataTypes.STRING,
    admin: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: 'id',
      },
      validate: {
        notEmpty: {
          msg: 'Please select an admin'
        }
      }
    },
    members: DataTypes.ARRAY(DataTypes.INTEGER),
    tasks: DataTypes.ARRAY(DataTypes.INTEGER),
  }, { sequelize });

  Project.associate = function(models) {
    Project.belongsTo(models.User)
    // associations can be defined here
  };
  return Project;
};