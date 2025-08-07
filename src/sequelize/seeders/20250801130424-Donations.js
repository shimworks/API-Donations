'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Donations',
      [{
          id: 1,
          value: 3800,
          donorId: 1,
          donatedAt: new Date(2025, 8, 1, 12, 30, 0)
        },
        {
          id: 2,
          value: 4200,
          donorId: 2
        },
        {
          id: 3,
          value: 9800,
          donorId: 3
        }])
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('Donations', null, {});

  }
};
