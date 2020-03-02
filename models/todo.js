'use strict';
module.exports = (sequelize, DataTypes) => {
    const Model = sequelize.Sequelize.Model
    class Todo extends Model {}
    Todo.init({
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              function(value){
                if(value === null || value === ''){
                  throw new Error('Title Cannot Be Empty')
                }
              }
          }
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              function(value){
                if(value === null || value === ''){
                  throw new Error('Description Cannot Be Empty')
                }
              }
          }
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              function(value){
                if(value === null || value === ''){
                  throw new Error('Status Cannot Be Empty')
                }
              }
            }
        },
        due_date: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              function(value){
                if(value === null || value === ''){
                  throw new Error('Due Date Cannot Be Empty')
                }
              }
          }
        }
    }, { sequelize })

    Todo.associate = function(models) {
        // associations can be defined here
    };
    return Todo;
};