'use strict';
const bcrypt = require(`../helpers/bcrypt`)

module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model

  class User extends Model { }

  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          msg: `Wrong Email Format`
        }
      }
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
  }, {
    sequelize, hooks: {
      beforeCreate: (instance, options) => {
        instance.password = bcrypt.hashing(instance.password)
      }
    }
  });

  User.associate = function (models) {
    // associations can be defined here
    User.hasMany(models.Todolist)
  };
  return User;
};