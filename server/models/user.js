'use strict';
const bcyrpt = require('bcrypt')
const createError = require('../helper/http-errors')
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize
  class User extends Model { }

  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Please fill in all fields' },
        notEmpty: { msg: 'Please fill in all fields' }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Please fill in all fields' },
        notEmpty: { msg: 'Please fill in all fields' },
        isEmailUniq(value) {
          return User.findOne({ where: { email: value } })
            .then(resultEmail => {
              if (resultEmail) {
                throw createError('406', 'Not Acceptable')
              }
            })
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Please fill in all fields' },
        notEmpty: { msg: 'Please fill in all fields' },
        len: {
          args: 6,
          msg: 'Password must be at least 6 characters'
        }
      }

    }
  }, {
    hooks:
    {
      beforeCreate: (user, options) => {
        user.password = bcyrpt.hashSync(user.password, 10)
      }
    }
    , sequelize
  })

  // const User = sequelize.define('User', {
  //   username: DataTypes.STRING,
  //   email: DataTypes.STRING,
  //   password: DataTypes.STRING
  // }, {});
  User.associate = function (models) {
    // associations can be defined here
    User.hasMany(models.Todo)
  };
  return User;
};