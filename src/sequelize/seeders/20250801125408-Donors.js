'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Donors',
      [{
          id: 1,
          fullName: "Jane Doe",
          email: "jane.doe@email.com",
          phone: "089 908 321",
          password: "seenhaJane",
          donatedValue: 3800,
        },
        {
          id: 2,
          fullName: "Kan Lakam",
          email: "kan.lakam@email.com",
          phone: "789 456 123",
          password: "seenhaKan",
          donatedValue: 4200,
        },
        {
          id: 3,
          fullName: "Jhon Wick",
          email: "jhon.wick@email.com",
          phone: "456 789 123",
          password: "senhajhon",
          donatedValue: 9800,
        }])
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('Donors', null, {});
  }
};
