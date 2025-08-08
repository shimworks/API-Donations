'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Donations',
      [{
          id: 1,
          value: 3800,
          donorId: 1,
          donatedAt: new Date ("2025-09-01T12:30:00.000Z"),
          updatedAt: new Date ("2025-09-01T12:30:00.000Z")
        },
        {
          id: 2,
          value: 4200,
          donorId: 2,
          donatedAt: new Date ("2025-09-01T12:30:00.000Z"),
          updatedAt: new Date ("2025-09-01T12:30:00.000Z")
        },
        {
          id: 3,
          value: 9800,
          donorId: 3,
          donatedAt: new Date ("2025-09-01T12:30:00.000Z"),
          updatedAt: new Date ("2025-09-01T12:30:00.000Z")
        }])
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('Donations', null, {});

  }
};
