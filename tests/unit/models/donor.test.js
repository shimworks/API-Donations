const { expect } = require('chai')
const { spy } = require('sinon')
const proxyquire = require('proxyquire')
const { sequelize, Sequelize } = require('sequelize-test-helpers')


describe('src/models/Donor', () => {
  const { DataTypes } = Sequelize

  const DonorFactory = proxyquire('../../../src/sequelize/models/donor.js', {
    sequelize: Sequelize
  })

  let Donor

  before(() => {
    Donor = DonorFactory(sequelize, DataTypes)
  })

  // It's important you do this
  after(() => {
    Donor.init.resetHistory()
  })

  it('called Donor.init with the correct parameters', () => {
    expect(Donor.init).to.have.been.equal(
      {
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING
      },
      {
        sequelize,
        modelName: 'Donor'
      }
    )
  })
})