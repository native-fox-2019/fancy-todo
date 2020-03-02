'use strict';
module.exports = (sequelize, DataTypes) => {
  const todo = sequelize.define('todo', {
    title: {
      type: DataTypes.STRING,
      validate: {
        customValidator(value) {
          if (value === null || value === '') {
            throw new Error("title tidak boleh kosong")
          }
        }
      }
    },
    description: DataTypes.STRING,
    status: DataTypes.STRING,
    due_date: DataTypes.DATE
  }, {});
  todo.associate = function (models) {
    // associations can be defined here
  };
  return todo;
};