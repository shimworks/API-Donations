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
const { generateToken } = require("../../src/Modules/Services/auth");
const app = require("../../src/app");
const { expect, use } = chai
use(chaiHttp)

const Token = `Bearer ${generateToken({ id: 1, email: 'jane.doe@email.com' })}`
// const Token = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJqYW5lLmRvZXN0dWJAZW1haWwuY29tIiwiaWF0IjoxNzU0NTk4MjE1LCJleHAiOjE3NTUyMDMwMTV9.nW_iOvISnt66eoBvjrPgKPc4jP3y2FOFzHHfsGF59vM`
const donationList = [
  {
    id: 1,
    value: 3800,
    donatedAt: "2025-09-01T12:30:00.000Z",
    updatedAt: "2025-09-01T12:30:00.000Z",
    donorId: 1
  },
]

describe('Testing Donation endpoints', function () {

  before(function (done) {
    this.timeout(0);
    shell.exec('npx sequelize-cli db:drop');
    shell.exec('npx sequelize-cli db:create && npx sequelize-cli db:migrate');
    shell.exec('npx sequelize-cli db:seed:all');
    done();
  })
  // after(function (done) {
  //   this.timeout(0);
  //   shell.exec('npx sequelize-cli db:seed:undo --seed 20250801130424-Donations.js');
  //   shell.exec('npx sequelize-cli db:seed --seed 20250801130424-Donations.js');
  //   done();
  // })

  it('should return only donations from the logged donor', (done) => {
    chai.request(app)
      .get('/donation')
      .set('Authorization', Token)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.deep.equal({ data: donationList });
        done();
      });
  })

  it('should create a new donation', (done) => {
    chai.request(app)
      .post('/donation')
      .set('Authorization', Token)
      .send(
        {
          value: 100,
          donatedAt: new Date("2025-09-07T10:30:00.000Z"),
          updatedAt: new Date("2025-09-07T10:30:00.000Z")
        }
      )
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.deep.equal({ message: 'Successfully donated, the donation Id is 4' });
        done();
      });
  })

  it('should return BadRequest donation', (done) => {
    chai.request(app)
      .post('/donation')
      .set('Authorization', Token)
      .send(
        {
          value: "asdasd",
          donatedAt: new Date(2025, 8, 7, 10, 30, 0),
        }
      )
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.deep.equal({ message: 'Error creating donation' });
        done();
      });
  })

  it('should return Unauthorized when posting donations', (done) => {
    chai.request(app)
      .post('/donation')
      .set('Authorization', `Bearer invalidtoken`)
      .send(
        {
          value: 100,
        }
      )
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body).to.deep.equal({ message: 'Login required' });
        done();
      });
  })

  it('should return Unauthorized when geting donations', (done) => {
    chai.request(app)
      .get('/donation')
      .set('Authorization', 'Bearer invalidtoken')
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body).to.deep.equal({ message: 'Login required' });
        done();
      });
  })
  it('should return No Content when updating donations', (done) => {
    chai.request(app)
      .put('/donation/1')
      .set('Authorization', Token)
      .send({
        value: 200,
      })
      .end((err, res) => {
        expect(res).to.have.status(204);
        expect(res.body).to.be.empty;
        done();
      });
  })

  it('should return Unauthorized when updating donations', (done) => {
    chai.request(app)
      .put('/donation/1')
      .set('Authorization', 'Bearer invalidtoken')
      .send({
        value: 200,
      })
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body).to.deep.equal({ message: 'Login required' });
        done();
      });
  })

  it('should return Forbidden when updating donations from other donors', (done) => {
    chai.request(app)
      .put('/donation/2')
      .set('Authorization', Token)
      .send({
        value: 200,
      })
      .end((err, res) => {
        expect(res).to.have.status(403);
        expect(res.body).to.deep.equal({ message: "Can't update other donors donations" });
        done();
      });
  })

  it('should return BadRequest when updating donations from other donors', (done) => {
    chai.request(app)
      .put('/donation/1')
      .set('Authorization', Token)
      .send({
        value: "notAValue",
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.deep.equal({ message: 'Verify if value is integer' });
        done();
      });
  })

  it('should return No Content when deleting donations', (done) => {
    chai.request(app)
      .delete('/donation/2')
      .set('Authorization', Token)
      .end((err, res) => {
        expect(res).to.have.status(204);
        expect(res.body).to.be.empty;
        done();
      });
  })

  it('should return Unauthorized when deleting donations', (done) => {
    chai.request(app)
      .delete('/donation/2')
      .set('Authorization', 'Bearer invalidtoken')
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body).to.deep.equal({ message: 'Login required' });
        done();
      });
  })
});