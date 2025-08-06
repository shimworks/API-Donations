const { expect } = require('chai');

const {
  sequelize,
  dataTypes,
  checkModelName,
  checkUniqueIndex,
  checkPropertyExists,
  checkNonUniqueIndex,
} = require('sequelize-test-helpers');

const DonorModel = require('../../../src/sequelize/models/donor');

describe('### Unit Donor Model', () => {
  const Donor = DonorModel(sequelize, dataTypes);
  const donor = new Donor();

  checkModelName(Donor)('Donor');

  context('properties', () => {
    ['fullName', 'email', 'password', 'phone'].forEach(checkPropertyExists(donor));
  });

  // context('associations', () => {
  //   const Company = 'some dummy company'

  //   before(() => {
  //     Donor.associate({ Company })
  //   })

  //   it('defined a belongsTo association with Company', () => {
  //     expect(Donor.belongsTo).to.have.been.calledWith(Company)
  //   })
  // })

  context('indexes', () => {
    context('unique', () => {
      ['email'].forEach(checkUniqueIndex(donor));
    });
  });
});