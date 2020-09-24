'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Todos', [{
      title: 'mencari uang',
      description: 'cari pinjaman',
      status: 'ragu-ragu',
      due_date: 'minggu depan',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      title: 'mencari ilmu',
      description: 'belajar rajin',
      status: 'wajib',
      due_date: 'minggu lalu',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ], {});
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Todos', null, {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
