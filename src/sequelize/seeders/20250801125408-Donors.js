const { hashPassword } = require("../../Modules/Services/auth");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword1 = await hashPassword('seenhaJane');
    const hashedPassword2 = await hashPassword('seenhaKan');
    const hashedPassword3 = await hashPassword('senhajhon');
    
    return queryInterface.bulkInsert('Donors',
      [{
          id: 1,
          fullName: 'Jane Doe',
          email: 'jane.doe@email.com',
          phone: '089 908 321',
          password: hashedPassword1,
          createdAt: new Date('2011-08-01T19:58:00.000Z'),
          updatedAt: new Date('2011-08-01T19:58:51.000Z')
        },
        {
          id: 2,
          fullName: 'Kan Lakam',
          email: 'kan.lakam@email.com',
          phone: '789 456 123',
          password: hashedPassword2,
          createdAt: new Date('2011-08-01T19:58:00.000Z'),
          updatedAt: new Date('2011-08-01T19:58:51.000Z')
        },
        {
          id: 3,
          fullName: 'Jhon Wick',
          email: 'jhon.wick@email.com',
          phone: '456 789 123',
          password: hashedPassword3,
          createdAt: new Date('2011-08-01T19:58:00.000Z'),
          updatedAt: new Date('2011-08-01T19:58:51.000Z')
        }]);
  },

  async down(queryInterface, Sequelize) {
     await queryInterface.bulkDelete('Donors', null, {});
  },
};
