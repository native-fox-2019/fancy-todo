'use strict';
module.exports = (sequelize, DataTypes) => {

  const {hashPassword} = require('../helpers/bcryptjs.js')

  const Model = sequelize.Sequelize.Model
  class User extends Model {}

  User.init({
    username: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Please insert an username'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Please insert an email address'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Please insert a password'
        }
      }
    }
  }, {
    hooks: {
      beforeCreate: (instance, options) => {
        let inputPass = instance.password
        instance.password = hashPassword(inputPass)
      }
    },
    sequelize
  });

  User.associate = function(models) {
    User.hasMany(models.Task)
    User.hasMany(models.Project)
    // associations can be defined here
  };
  return User;
};