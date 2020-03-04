'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProjectUser = sequelize.define('ProjectUser', {
    ProjectId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, {});
  ProjectUser.associate = function(models) {
    // ProjectUser.hasMany(models.Project)
    // ProjectUser.hasMany(models.User)
  };
  return ProjectUser;
};