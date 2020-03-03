"use strict";
const { hashed } = require("../helpers/hashed");
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model;
  class User extends Model {}

  User.init(
    {
      fullname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Name Cannot Be Empty"
          }
        }
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: {
            msg: "Username Cannot Be Empty"
          }
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: {
            msg: "Email Cannot Be Empty"
          }
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Password Cannot Be Empty"
          }
        }
      }
    },
    {
      hooks: {
        beforeCreate(instance, options) {
          return hashed(instance.password).then(hashed => {
            instance.password = hashed;
          });
        }
      },
      sequelize
    }
  );

  User.associate = function(models) {
    User.hasMany(models.Todo);
  };
  return User;
};
