'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(`Todolists`, `UserId`, Sequelize.INTEGER, {
      references: {
        table: `Users`,
        field: `id`
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    return queryInterface.removeColumn(`Todolists`, `UserId`)
  }
};
