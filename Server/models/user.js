'use strict';
/**
 * @swagger
 *  components:
 *    schemas:
 *      User:
 *        type: object
 *        required:
 *          - email
 *          - password
 *        properties:
 *          email:
 *            type: string
 *          password:
 *            type: string
 *          createdAt:
 *            type: Date
 *          updatedAt:
 *            type: Date
 *        example:
 *          email: rofandi.gunawan@yahoo.com
 *          password: rofandi.gunawan
 *          createdAt: 2020-10-10T00:00:00.000Z
 *          updatedAt: 2020-10-10T00:00:00.000Z
 */
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
    User.hasMany(models.ToDo);
  };
  return User;
};