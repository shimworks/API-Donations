const chai = require("chai")
const sinon = require("sinon")
const shell = require('shelljs');
const chaiHttp = require("chai-http")
require('dotenv').config({ path: '.env' });
// const { Donor } = require("../../src/Modules/Models/Donor")
// const {
//   createDonor,
//   getDonorById,
//   updateDonor,
//   deleteDonor
// } = require("../../src/services/donorService")
const app = require("../../src/app")
const { expect, use } = chai
use(chaiHttp)

const donorList = [
  {
    id: 1,
    fullName: 'Jane Doe',
    email: 'jane.doe@email.com',
    phone: '089 908 321',
    password: 'seenhaJane',
  },
  {
    id: 2,
    fullName: 'Kan Lakam',
    email: 'kan.lakam@email.com',
    phone: '789 456 123',
    password: 'seenhaKan',
  },
  {
    id: 3,
    fullName: 'Jhon Wick',
    email: 'jhon.wick@email.com',
    phone: '456 789 123',
    password: 'senhajhon',
  }
]

describe('Testing Donor endpoints', function () {

  before(function (done) {
    this.timeout(0);
    shell.exec('npx sequelize-cli db:drop');
    shell.exec('npx sequelize-cli db:create && npx sequelize-cli db:migrate');
    done();

  })
  it('should create a new donor', (done) => {
    chai.request(app)
      .post('/signup')
      .send(
        {
          fullName: 'Jane Doe',
          email: 'jane.doestub@email.com',
          phone: '089 908 321',
          password: 'seenhaJane',
        }
      )
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body).to.deep.equal({ message: 'Donor successfully created' });
        done();
      });
  });

  it('should not create a donor with an existing email', (done) => {
    chai.request(app)
      .post('/signup')
      .send(
        {
          fullName: 'Jane Doe',
          email: 'jane.doestub@email.com',
          phone: '089 908 321',
          password: 'seenhaJane',
        }
      )
      .end((err, res) => {
        expect(res.status).to.equal(409);
        expect(res.body).to.deep.equal({ message: 'Email already exists' });
        done();
      });
  });

  it('should login successfully', (done) => {
    chai.request(app)
      .post('/login')
      .send(
        {
          email: 'jane.doestub@email.com',
          password: 'seenhaJane'
        }
      )
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.token).to.not.be.null;
        done();
      });
  });

  it('should return password error', function (done) {
    this.timeout(5000);
    chai.request(app)
      .post('/login')
      .send(
        {
          email: 'jane.doestub@email.com',
          password: 'asdddd'
        }
      )
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body).to.be.deep.equal({ message: 'Password is incorrect' });
        done();
      });
  });

  it('should return donor not found', (done) => {
    chai.request(app)
      .post('/login')
      .send(
        {
          email: 'jane.dontexists@email.com',
          password: 'seenhaJane',
        }
      )
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body).to.be.deep.equal({ message: 'Donor not found' });
        done();
      });
  });
  // it('Testando a listagem de todas as pessoas', async function () {
  //   sinon.stub(connection, 'execute').resolves([donorList]);
  //   const response = await chai
  //     .request(app)
  //     .get('/donor');

  //   expect(response.status).to.equal(200);
  //   expect(response.body).to.deep.equal(donorList);
  // });

})