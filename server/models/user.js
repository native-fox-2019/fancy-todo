'use strict';
const bcrypt = require('bcrypt')
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model
  class User extends Model { }
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'username cant be empty'
        }
      }
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isEmail:true
      },
      unique: {
          args: true,
          msg: 'Email address already in use!'
      }
    },    
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'password cant be empty'
        }
      }
    }
  }, {
    hooks: {
      beforeSave: (instance, option) => {
        const salt = 10
        const hash = bcrypt.hashSync(instance.password, salt)
        instance.password = hash
      }
    }
    , sequelize
  });
  User.associate = function (models) {
    // associations can be defined here
    User.hasMany(models.Todo)
  };
  return User;
};