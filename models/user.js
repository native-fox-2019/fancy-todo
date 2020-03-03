'use strict';
const bcrypt = require('bcryptjs')

module.exports = (sequelize, DataTypes) => {
  class User extends sequelize.Sequelize.Model {}

  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    hooks:{
      beforeCreate: (instance, option) => {
        return bcrypt.hash(instance.password, 10)
        .then( hash => {
          instance.password = hash
        } )
        .catch( err => {
          console.log('Error Hashing Password')
        } )
      }
    },
    sequelize
  })

  User.associate = function(models) {
    User.hasMany( models.Todo, {foreignKey: 'user_id'} )
  };
  return User;
};