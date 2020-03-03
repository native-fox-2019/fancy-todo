'use strict';

let bcrypt = require('bcrypt')
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model
  class User extends Model{}
  User.init({
    email: {
      type: Sequelize.STRING,
      validate: {notEmpty: true}
    }, 
    password: {
      type: Sequelize.STRING,
      validate: {notEmpty: true}
    }
  }, {
    hooks: {
      beforeCreate: (instance, option) => {
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(instance.password, salt);
        instance.password = hash
      }
    },
    sequelize})
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Todo, {foreignKey: 'userId'})
  };
  return User;
}

  /*
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};
*/