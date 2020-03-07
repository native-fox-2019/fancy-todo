'use strict';

const bcrypt = require('bcrypt')
const saltRounds = 10;

module.exports = (sequelize, DataTypes) => {

  const Sequelize=sequelize.Sequelize
  const Model = Sequelize.Model
  class User extends Model{}

  User.init({
    name: {
      type:DataTypes.STRING,
      validate:{notEmpty:{
        msg:'name cannot be an empty space'
      }}
    },
    email: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          msg:"email cannot be an empty space"
        }
      }
    },
    password: {type:DataTypes.STRING,
    validate:{
      notEmpty:{
        msg:"Password cannot be an empty space"
      }
    }}

  },{ hooks:{
    beforeSave:(instance,option)=>{
      return bcrypt.hash(instance.password, saltRounds)
      .then(hash =>{
          instance.password=hash
      })
    } 
  },sequelize})

  // const User = sequelize.define('User', {
  //   name: DataTypes.STRING,
  //   email: DataTypes.STRING,
  //   password: DataTypes.STRING
  // }, {});
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Todo, {foreignKey:"UserId"})
  };
  return User;
};