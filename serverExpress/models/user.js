'use strict';
module.exports = (sequelize, DataTypes) => {
  
  const bcrypt = require('bcrypt')
  const Sequelize = sequelize.Sequelize;
  const Model = Sequelize.Model;

  class User extends Model{}

  User.init({
    first_name: {
      type: DataTypes.STRING,
      validate: 
      {
        notEmpty: {
          msg: 'Please input your name'
        }
      }
    },
    last_name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: 
      {
        notEmpty: {
          msg: 'Please input your email'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: 
      {
        notEmpty: {
          msg: 'Please input the password'
        }
      }
    }
  }, { 
    hooks: {
      beforeSave: (user, options) => {
        return bcrypt.hash(user.password, 8)
        .then(function(hash) {
          user.password = hash;
        });
      }
    },
    sequelize 
  })
 
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Todo, {foreginKey: 'UserId'})
  };
  return User;
};