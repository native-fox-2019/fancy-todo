'use strict';
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize
  class Todo extends Model { }
  Todo.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Please fill in all fields' },
        notEmpty: { msg: 'Please fill in all fields' }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Please fill in all fields' },
        notEmpty: { msg: 'Please fill in all fields' }
      }
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Please fill in all fields' },
        notEmpty: { msg: 'Please fill in all fields' },
        isIn: {
          args: [['not done', 'finished', 'Expired']],
          msg: 'status not found'
        }
      }
    },
    due_date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: { msg: 'Please fill in all fields' },
        notEmpty: { msg: 'Please fill in all fields' }
      }
    }
  }, { sequelize })
  // const Todo = sequelize.define('Todo', {
  //   title: DataTypes.STRING,
  //   description: DataTypes.STRING,
  //   status: DataTypes.STRING,
  //   due_date: DataTypes.DATE
  // }, {});
  Todo.associate = function (models) {
    // associations can be defined here
    Todo.belongsTo(models.User)
  };
  return Todo;
};