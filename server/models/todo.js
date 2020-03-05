'use strict';
module.exports = (sequelize, DataTypes) => {
  class Todo extends sequelize.Sequelize.Model {}
  
  Todo.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull:{
          msg: 'Title Todo tidak boleh kosong'
        }
      }
    },
    description: DataTypes.STRING,
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    due_date: {
      type: DataTypes.DATE,
      validate:{
        checkDate(date){
          if(date.toString() == 'Invalid Date'){
            throw new Error('Invalid Date')
          }
        }
      }
    },
    user_id: DataTypes.INTEGER
  }, {sequelize})

  Todo.associate = function(models) {
    Todo.belongsTo( models.User, {foreignKey: 'user_id'} )
  };
  return Todo;
};