'use strict';
module.exports = (sequelize, DataTypes) => {
  class Todo extends sequelize.Sequelize.Model {}

  Todo.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Title todo tidak boleh kosong'
        }
      }
    },
    description: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    due_date: {
      type: DataTypes.DATE,
      validate:{
        formatCheck: (due_date) => {
          if(due_date.toString() == 'Invalid Date'){
            throw new Error('Silahkan memasukkan tanggal due date dengan format YYYY-MM-DD')
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