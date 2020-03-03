'use strict';
module.exports = (sequelize, DataTypes) => {
  class User extends sequelize.Sequelize.Model {}

  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {sequelize})

  User.associate = function(models) {
    User.hasMany( models.Todo, {foreignKey: 'user_id'} )
  };
  return User;
};