'use strict';
const bcrypt = require('../helpers/bcrypt')
module.exports = (sequelize, DataTypes) => {
  const models = sequelize.Sequelize.Model
  class User extends models {

  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: {
            msg: 'Must be filled with Email'
          },
        },
        unique:true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: `Password must be filled`
          }
        }
      }
    },
    {sequelize, hooks: {
        beforeCreate: (instance, options) => {
          User.password = bcrypt.hasher(User.password)
        }
      }
    })
  // const User = sequelize.define('User', {
  //   email: DataTypes.STRING,
  //   password: DataTypes.STRING
  // }, {});
  User.associate = function (models) {
    // associations can be defined here
    User.hasMany(models.Todo)
  };
  return User;
};