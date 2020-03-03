'use strict';
module.exports = (sequelize, DataTypes) => {

  const Model=sequelize.Sequelize.Model;
  const jwt=require('jsonwebtoken');

  class User extends Model{

    static validateToken(token){
      let secret=process.env.JWT_SECRET || 'hehe' ;
      let decoded =jwt.verify(token,secret);
      return decoded;
    }

    get tokenvalue(){
      return { 
        email: this.email,
        id:this.id,
        username:this.username 
      }
    }

  }

  User.init({
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING
  }, {sequelize,tableName:'Users'})

  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Todo,{foreignKey:'userId'});
  };
  return User;
};