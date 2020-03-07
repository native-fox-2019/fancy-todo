'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class Todo extends Model {}
  Todo.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: { msg: "Validation errors (title can not be empty)" }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: { msg: "Validation errors (description can not be empty)" }
      }
    },
    status: DataTypes.STRING,
    due_date: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: { msg: "Validation errors (due_date can not be empty)" }
      }
    }
  }, {
    hooks: {
      beforeCreate: (instances, options) => {
        instances.status = "Not Started"
      }
    }, 
    sequelize 
  })
  Todo.associate = function(models) {
    Todo.belongsTo(models.User, { foreignKey: 'UserId' })
    Todo.belongsTo(models.Project, { foreignKey: 'ProjectId' })
  };
  return Todo;
};