'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
     return queryInterface.addConstraint('Todos', ['userId'], {
          type: 'foreign key',
          name: 'Todos_userId_fk',
          references: { //Required field
            table: 'Users',
            field: 'id'
          },
          onDelete: 'cascade',
          onUpdate: 'cascade'
        });
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
     return queryInterface.removeConstraint('Todos','Todos_userId_fk');
  }
};
