'use strict';
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize
  const { encrypt } = require('../helpers/bcrypt')

  class User extends Model {

  }

  User.init({
    email: {
      type: DataTypes.STRING,
      validate : {
        notEmpty: {msg: 'Email cannot be empty'},
        isEmail: { msg: 'Enter a valid email' }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate : {
        notEmpty: {
          msg: 'Password cannot be empty'
        }
      }
    },
  }, 
  { 
    hooks: {
      beforeSave: (instance, options) => {
        return encrypt(instance.password)
        .then(hashed => {
          instance.password = hashed
        })
      }
    },
    sequelize } )

  User.associate = function(models) {
    User.hasMany(models.Todo , { foreignKey: 'userId' })
  };
  return User;
};