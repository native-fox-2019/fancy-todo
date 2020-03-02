'use strict';
const {encryptPassword} = require('../helpers/generatePassword')

module.exports = (sequelize, DataTypes) => {
  const {Model} = sequelize.Sequelize
  class User extends Model{}
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      }},
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      }},
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      }}
  }, { hooks: {
    beforeCreate(data, options) {
      data.password = encryptPassword(data.password)
    }
  },
    sequelize})
  User.associate = function(models) {
  User.hasMany(models.Todo)
  };
  return User;
};