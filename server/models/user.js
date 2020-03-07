'use strict';
module.exports = (sequelize, DataTypes) => {
  let Model = sequelize.Sequelize.Model
  class User extends Model{}
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        function(value){
          if(!value){
            throw new Error('Email is empty');
          }
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        function(value){
          if(!value){
            throw new Error('Password is empty');
          }
        }
      }
    }
  }, {sequelize})
  
  User.associate = function(models) {
    User.hasMany(models.Todo, {foreignKey: 'userId'});
  };
  return User;
};