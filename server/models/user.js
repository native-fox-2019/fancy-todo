'use strict';
const { generatePass } = require('../helpers/passwordGeneral')
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class User extends Model { }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          args: true,
          msg: 'username can not be empty!'
        },
        notEmpty: {
          args: true,
          msg: 'username can not be empty!'
        },
        len: {
          args: 3,
          msg: "username must be at least 3 characters in length"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          args: true,
          msg: 'email can not be empty!'
        },
        notEmpty: {
          args: true,
          msg: 'email can not be empty!'
        },
        isEmail: {
          args: true,
          msg: 'please enter a valid email address'
        },
        len: {
          args: [6, 128],
          msg: "email address must be between 6 and 128 characters in length"
        },
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'password can not be empty!'
        },
        notEmpty: {
          args: true,
          msg: 'password can not be empty!'
        },
        len: {
          args: 3,
          msg: 'password must be at least 3 characters in length'
        }
      }
    }
  }, {
    hooks: {
      beforeCreate(user, options) {
        user.password = generatePass(user.password)
      }
    },

    sequelize
  });
  User.associate = function (models) {
    User.hasMany(models.Todo)
  };
  return User;
};