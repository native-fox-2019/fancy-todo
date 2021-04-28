'use strict';
const bcrypt = require('bcrypt')

module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize

  class User extends Model { }

  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'username cannot be empty.'
        },
        notNull: {
          args: true,
          msg: 'username cannot be null.'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          args: true,
          msg: 'email cannot be empty.'
        },
        notNull: {
          args: true,
          msg: 'email cannot be null.'
        },
        isEmail: {
          args: true,
          msg: 'wrong email format.'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'password cannot be empty.'
        },
        notNull: {
          args: true,
          msg: 'password cannot be null.'
        }
      }
    },
  }, {
    hooks: {
      beforeCreate(instance, option) {
        const salt = 10;
        const hash = bcrypt.hashSync(instance.password, salt)
        instance.password = hash;
      },
    }, sequelize
  });
  User.associate = function (models) {
    // associations can be defined here
  };
  return User;
};