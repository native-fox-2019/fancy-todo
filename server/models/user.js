'use strict';
const bcrypt = require('bcrypt')

module.exports = (sequelize, DataTypes) => {
  class User extends sequelize.Sequelize.Model {}

  User.init({
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull:{
          msg: 'Email tidak boleh kosong'
        }
      }
    },
    password: DataTypes.STRING
  }, {
    hooks:{
      beforeCreate: (instance, option) => {
        return bcrypt.hash( instance.password, 10 ).then( result => {
          instance.password = result
        } ).catch( err => {
          console.log({message: 'Error hashing password', error: err})
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