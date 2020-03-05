'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model
  
  const bcrypt = require('bcrypt')

  class User extends Model{}
  User.init(
    {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {sequelize,tableName:'Users',hooks:{
    beforeCreate: (instance,options)=>{
     return bcrypt.hash(instance.password, 10)
      .then(function(hash) {
        instance.password = hash
      })
    }
  }}
  )
  
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Todo,{foreignKey:'userId'})
  };
  return User;
};