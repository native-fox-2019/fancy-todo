'use strict';
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
        const bcrypt = require('bcrypt');
        const saltRounds = 10;

        return bcrypt.hash(instance.password, saltRounds)
          .then(hash => {
            instance.password = hash
          })
          .catch(err => {
            console.log(err)
          })
      }
    }
  });

  User.associate = function (models) {
    // associations can be defined here
    User.hasMany(models.Todolist)
  };
  return User;
};