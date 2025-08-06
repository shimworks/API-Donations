'use strict'
const {
  sequelize,
  dataTypes,
  checkModelName,
  checkUniqueIndex,
  checkPropertyExists,
  checkNonUniqueIndex,
} = require('sequelize-test-helpers')
const chai = require('chai')
chai.should()
chai.use(require('sinon-chai'))
const expect = chai.expect

const DonationModel = require('../../../src/sequelize/models/donation')

describe('### Unit Donation Model', () => {
  const Donation = DonationModel(sequelize, dataTypes)
  const donation = new Donation()

  checkModelName(Donation)('Donation')

  context('properties', () => {
    ;['value', 'createdAt'].forEach(checkPropertyExists(donation))
  })

  context('associations', () => {
    const Donor = {
          id: 1,
          fullName: "Jane Doe",
          email: "jane.doe@email.com",
          phone: "089 908 321",
          password: "seenhaJane",
          donatedValue: 3800,
    }

    before(() => {
      Donation.associate({ Donor })
    })

    it('defined a belongsTo association with Donor', () => {
      expect(Donation.belongsTo).to.have.been.calledWith(Donor)
    })
  })
})