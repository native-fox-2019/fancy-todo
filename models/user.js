'use strict';
module.exports = (sequelize, DataTypes) => {

  const bcrypt = require('bcryptjs');
  const saltRounds = 10;

  const Model = sequelize.Sequelize.Model
  class User extends Model {}

  User.init({
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
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(inputPass, salt);
        instance.password = hash
      }
    },
    sequelize
  });

  User.associate = function(models) {
    User.hasMany(models.Todo)
    // associations can be defined here
  };
  return User;
};