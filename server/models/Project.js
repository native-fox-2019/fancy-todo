'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class Project extends Model {}
  Project.init({
    name: DataTypes.STRING
  }, { sequelize })
  Project.associate = function(models) {
    Project.belongsToMany(models.User, { through: models.ProjectUser, foreignKey: 'ProjectId' })
    Project.hasMany(models.Todo, { foreignKey: 'ProjectId' })
  };
  return Project;
};