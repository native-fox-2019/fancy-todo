'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model

  class User extends Model { }

  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: `Email must be filled`
        },
        isEmail: {
          msg: `Must enter an Email`
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
  }, { sequelize });

  User.associate = function (models) {
    // associations can be defined here
    User.hasMany(models.Todolist)
  };
  return User;
};