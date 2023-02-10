/* eslint-disable no-useless-concat */
const { Op } = require('sequelize');
const {
  describe, it, after, assert,
} = require('mocha');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../src/index');
const { sequelizeManager } = require('../src/managers');

const { employeeDetailsModel } = sequelizeManager;

chai.use(chaiHttp);

// eslint-disable-next-line no-unused-vars
const should = chai.should();

const gt255 = `This website stores cookies on your computer. 
These cookies are used to collect information about how you interact with our website and 
allow us to remember you.We use this information in order to improve and customize your 
browsing experience and for analytics and metrics about our visitors both on this website and other media`;

const baseUrl = '/employees';

const createTestData = async () => employeeDetailsModel.bulkCreate([{
  employee_id: 1,
  department_id: 1,
  first_name: `${Math.floor(100000 + Math.random() * 900000)}`,
  last_name: `${Math.floor(100000 + Math.random() * 900000)}`,
  email_id: `${Math.floor(100000 + Math.random() * 900000)}` + '@gmail.com',
  phone_no: `${Math.floor(Math.random() * 9000000000) + 1000000000}`,
  address: `${Math.floor(100000 + Math.random() * 900000)}`,
},
]);
console.log(createTestData);
// }, {
//   first_name: `${Math.floor(100000 + Math.random() * 900000)}`,
//   last_name: `${Math.floor(100000 + Math.random() * 900000)}`,
//   email_id: `${Math.floor(100000 + Math.random() * 900000)}`,
//   phone_no: `${Math.floor(Math.random() * 90000) + 10000}`,
//   address: `${Math.floor(100000 + Math.random() * 900000)}`,
//   employee_id: 2,
//   deleted: 2,
//   deleted_at: new Date(),
// },
// {
//   first_name: `${Math.floor(100000 + Math.random() * 900000)}`,
//   last_name: `${Math.floor(100000 + Math.random() * 900000)}`,
//   email_id: `${Math.floor(100000 + Math.random() * 900000)}`,
//   phone_no: `${Math.floor(Math.random() * 90000) + 10000}`,
//   address: `${Math.floor(100000 + Math.random() * 900000)}`,
//   employee_id: 3,
//   deleted: 3,
//   deleted_at: new Date(),

// }, {
//   first_name: `${Math.floor(100000 + Math.random() * 900000)}`,
//   last_name: `${Math.floor(100000 + Math.random() * 900000)}`,
//   email_id: `${Math.floor(100000 + Math.random() * 900000)}`,
//   phone_no: `${Math.floor(Math.random() * 90000) + 10000}`,
//   address: `${Math.floor(100000 + Math.random() * 900000)}`,
//   employee_id: 4,
//   deleted: 4,
//   deleted_at: new Date(),
// },

// const getOne = async ({ id }) => employeeDetailsModel.findOne({
//   where: {
//     id,
//   },
// });
// const getLastRowId = async () => employeeDetailsModel.max('id');

// const getList = async ({ id = 1, limit = 10 }) => employeeDetailsModel.findAll({
//   where: {
//     id,
//   },
//   limit,
// });

describe('EmployeeDetails Test Suit', async () => {
  // Create Employee Details
  describe(`POST ${baseUrl}/register`, () => {
    it('should create bulk test data.', async () => {
      await createTestData();
    });

    it('should create a employee details. ', async () => {
      const body = {
        employee_id: 1,
        department_id: 1,
        first_name: String(Math.floor(100000 + Math.random() * 900000)),
        last_name: String(Math.floor(100000 + Math.random() * 900000)),
        email_id: `${String(Math.floor(100000 + Math.random() * 900000))}@gmail.com`,
        phone_no: String(Math.floor(Math.random() * 9000000000) + 1000000000),
        address: String(Math.floor(100000 + Math.random() * 900000)),

      };
      console.log(body);
      const res = await chai.request(app)
        .post(`${baseUrl}/register`)
        .send(body);

      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.should.have.property('data')
        .which
        .is
        .an('object')
        .that
        .has
        .property('employee')
        .which
        .is
        .an('object');
    });

    it('should give validation error because name can not be blank.', async () => {
      const body = {
        first_name: '',
        last_name: ' ',
      };

      const res = await chai
        .request(app)
        .post(`${baseUrl}/register`)
        .send(body);

      res.should.have.status(400);
      res.error.should.not.be.false;
    });

    it('should give validation error because first-name is not string.', async () => {
      const body = {
        first_name: '12562',
      };

      const res = await chai
        .request(app)
        .post(`${baseUrl}/register`)
        .send(body);
      res.should.have.status(400);
      res.error.should.not.be.false;
    });

    it('should give validation error because body contains a unknown field [xyz].', async () => {
      const body = {
        department: 'Testing',
      };

      const res = await chai
        .request(app)
        .post(`${baseUrl}/register`)
        .send(body);

      res.should.have.status(400);
      res.error.should.not.be.false;
    });

    it('should give validation error because department_id is a string', async () => {
      const body = {
        department_id: 'Testing',
      };

      const res = await chai
        .request(app)
        .post(`${baseUrl}/register`)
        .send(body);

      res.should.have.status(400);
      res.error.should.not.be.false;
    });

    it('should give validation error because first-name length is greater than 255 characters.', async () => {
      const body = {
        first_name: gt255,
      };

      const res = await chai
        .request(app)
        .post(`${baseUrl}/register`)
        .send(body);

      res.should.have.status(400);
      res.error.should.not.be.false;
    });
  });

  // Get All Employees List
  describe(`GET ${baseUrl}/`, () => {
    it('should return list of employees', async () => {
      const res = await chai.request(app)
        .get(`${baseUrl}/`);

      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.should.have.property('data')
        .which
        .is
        .an('object')
        .that
        .has
        .property('employees')
        .which
        .is
        .an('array');
    });

    it('should give validation error because parameters [sort_by] can not be empty.', async () => {
      const res = await chai.request(app)
        .get(`${baseUrl}?sort_by=`);

      res.should.have.status(400);
      res.error.should.not.be.false;
    });
    it('should give validation error because parameters [page_size] can not be empty.', async () => {
      const res = await chai.request(app)
        .get(`${baseUrl}?page_size=`);

      res.should.have.status(400);
      res.error.should.not.be.false;
    });
    it('should give validation error because parameters [page_no] can not be empty.', async () => {
      const res = await chai.request(app)
        .get(`${baseUrl}?page_no=`);

      res.should.have.status(400);
      res.error.should.not.be.false;
    });
    it('should give route not found error', async () => {
      const res = await chai.request(app)
        .get(`${baseUrl}/s`);

      res.should.have.status(400);
      res.error.should.not.be.false;
    });
  });
});
