'use strict';
const Bcrypt = require('../helpers/bcrypt.js')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});
  User.addHook('beforeCreate', (user)=>{
    user.password = Bcrypt.hash(user.password);
  })
  User.associate = function(models) {
  };
  return User;
};