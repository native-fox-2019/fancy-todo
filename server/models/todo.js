'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model=sequelize.Sequelize.Model;

  class Todo extends Model{

    get for_google(){
      return {
        summary: this.title,
        description: this.description,
        status:this.status,
        start: {
            dateTime: this.start_date.toISOString()
        },
        end: {
            dateTime: this.due_date.toISOString()
        }
      }
    }

  }

  Todo.init({
    title: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          msg:'Title cannot be empty'
        }
      }
    },
    description: {
      type:DataTypes.TEXT,
      validate:{
        notEmpty:{
          msg:'Description cannot be empty'
        }
      }
    },
    status: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          msg:'Status cannot be empty'
        }
      }
    },
    due_date: {
      type:DataTypes.DATE,
      validate:{
        notEmpty:{
          msg:'due_date cannot be empty'
        }
      }
    },
    start_date: {
      type:DataTypes.DATE,
      validate:{
        notEmpty:{
          msg:'start_date cannot be empty'
        }
      }
    },
    userId:{
      type:DataTypes.INTEGER
    },
    g_id:{
      type:DataTypes.STRING
    }
  }, {sequelize,modelName:'Todo'});


  Todo.associate = function(models) {
    // associations can be defined here
    Todo.belongsTo(models.User,{foreignKey:'userId'});

  };

  return Todo;
};