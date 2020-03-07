'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class User extends Model {}
  User.init({
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: { msg: "Validation errors (First Name can not be empty)" }
      }
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: { msg: "Validation errors (Last name can not be empty)" }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: { msg: "Validation errors (Email can not be empty)" }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: { msg: "Validation errors (Password can not be empty)" }
      }
    }
  }, { sequelize })
  User.associate = function(models) {
    User.hasMany(models.Todo, { foreignKey: 'UserId' })
    User.belongsToMany(models.Project, { through: models.ProjectUser, foreignKey: 'UserId' })
  };
  return User;
};