"use strict";
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model;
  class Todo extends Model {}
  Todo.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Title Cannot Be Empty"
          }
        }
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Description Cannot Be Empty"
          }
        }
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Status Cannot Be Empty"
          }
        }
      },
      due_date: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Due Date Cannot Be Empty"
          }
        }
      }
    },
    { hooks : {
      beforeCreate(instance, options){
        
      }
    },sequelize }
  );

  Todo.associate = function(models) {
    // associations can be defined here
  };
  return Todo;
};


