'use strict';
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize
  const { encrypt } = require('../helpers/bcrypt')

  class User extends Model {

  }

  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, 
  { 
    hooks: {
      beforeSave: (instance, options) => {
        return encrypt(instance.password)
        .then(hashed => {
          instance.password = hashed
        })
      }
    },
    sequelize } )

  User.associate = function(models) {
    User.hasMany(models.Todo , { foreignKey: 'userId' })
  };
  return User;
};