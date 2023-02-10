const {
  describe, it,
} = require('mocha');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../src/index');
const { sequelizeManager } = require('../src/managers');

const { employeeDetailsModel } = sequelizeManager;

chai.use(chaiHttp);

// eslint-disable-next-line no-unused-vars
const { expect } = chai;

const gt255 = `This website stores cookies on your computer. 
These cookies are used to collect information about how you interact with our website and 
allow us to remember you.We use this information in order to improve and customize your 
browsing experience and for analytics and metrics about our visitors both on this website and other media`;

const baseUrl = '/employees';

const createTestData = async () => employeeDetailsModel.bulkCreate([{
  first_name: `${Math.floor(100000 + Math.random() * 900000)}`,
  last_name: `${Math.floor(100000 + Math.random() * 900000)}`,
  // eslint-disable-next-line no-useless-concat
  email_id: `${Math.floor(100000 + Math.random() * 900000)}` + '@gmail.com',
  phone_no: `${Math.floor(Math.random() * 9000000000) + 1000000000}`,
  address: `${Math.floor(100000 + Math.random() * 900000)}`,
  employee_id: 1,
  deleted: 1,
  deleted_at: new Date(),
}, {
  first_name: `${Math.floor(100000 + Math.random() * 900000)}`,
  last_name: `${Math.floor(100000 + Math.random() * 900000)}`,
  email_id: `${Math.floor(100000 + Math.random() * 900000)}`,
  phone_no: `${Math.floor(Math.random() * 90000) + 10000}`,
  address: `${Math.floor(100000 + Math.random() * 900000)}`,
  employee_id: 2,
  deleted: 2,
  deleted_at: new Date(),
},
{
  first_name: `${Math.floor(100000 + Math.random() * 900000)}`,
  last_name: `${Math.floor(100000 + Math.random() * 900000)}`,
  email_id: `${Math.floor(100000 + Math.random() * 900000)}`,
  phone_no: `${Math.floor(Math.random() * 90000) + 10000}`,
  address: `${Math.floor(100000 + Math.random() * 900000)}`,
  employee_id: 3,
  deleted: 3,
  deleted_at: new Date(),

}, {
  first_name: `${Math.floor(100000 + Math.random() * 900000)}`,
  last_name: `${Math.floor(100000 + Math.random() * 900000)}`,
  email_id: `${Math.floor(100000 + Math.random() * 900000)}`,
  phone_no: `${Math.floor(Math.random() * 90000) + 10000}`,
  address: `${Math.floor(100000 + Math.random() * 900000)}`,
  employee_id: 4,
  deleted: 4,
  deleted_at: new Date(),
},

]);

describe('EmployeeDetails Test Suit', async () => {
  // Create Employee Details
  describe(`POST ${baseUrl}/register`, () => {
    it('should create bulk test data.', async () => {
      // eslint-disable-next-line no-unused-vars
      await createTestData();
    });

    it('should create a employee details. ', async () => {
      const body = {
        employee_id: 1,
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
        .send(body)
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
        .send(body)
        .set(headers);

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
        .send(body)
        .set(headers);

      res.should.have.status(400);
      res.error.should.not.be.false;
    });
  });

  // // Update Employee Details by ID
  // describe(`PUT ${baseUrl}/employeeId/`, () => {
  //   const updatedFirstName = String(Math.floor(100000 + Math.random() * 900000));
  //   const updatedLastName = String(Math.floor(100000 + Math.random() * 900000));
  //   const updatedEmailId = `${String(Math.floor(100000 + Math.random() * 900000))}@gmail.com`;
  //   const updatedAddress = String(Math.floor(100000 + Math.random() * 900000));
  //   const updatedPhoneNo = String(Math.floor(Math.random() * 90000) + 10000);
  //   const body = {
  //     first_name: updatedFirstName,
  //     last_name: updatedLastName,
  //     email_id: updatedEmailId,
  //     phone_no: updatedPhoneNo,
  //     address: updatedAddress,
  //     employee_id: 1,
  //   };
  //   it('should update a employee name of given id.', async () => {
  //     const employee = await employeeDetailsModel.findOne();
  //     // const emp = response.body.data.employee;

  //     const res = await chai.request(app)
  //       .put(`${baseUrl}/${employee.id}`)
  //       .set(headers)
  //       .send(body);

  //     res.should.have.status(200);
  //     res.body.should.be.a('object');
  //     res.body.should.have.property('data')
  //       .is
  //       .an('object')
  //       .that
  //       .is
  //       .an('object')
  //       .that
  //       //  .has
  //       //  .property('employees')
  //       //  .which
  //       .is
  //       .equal(String(updatedFirstName, updatedAddress, updatedLastName, updatedEmailId, updatedPhoneNo));
  //     // expect(emp.first_name).to.equal(updatedFirstName);
  //     // expect(emp.last_name).to.equal(updatedLastName);
  //     // expect(emp.email_id).to.equal(updatedEmailId);
  //     // expect(emp.address).to.equal(updatedAddress);
  //     // expect(emp.phone_no).to.equal(updatedPhoneNo);
  //   });

  //   it('should return NotFound error.', async () => {
  //     const employee = await employeeDetailsModel.findOne();
  //     const res = await chai.request(app)
  //       .put(`/${employee}/${employee.id + 1}`)
  //       .set(headers)
  //       .send(body);

  //     res.should.have.status(404);
  //     res.body.should.be.a('object');
  //     res.body.should.have.property('error')
  //       .which
  //       .is
  //       .an('object')
  //       .that
  //       .has
  //       .property('code')
  //       .which
  //       .is
  //       .an('number')
  //       .which
  //       .is
  //       .equal(404);
  //   });
  // });

  // // Get All Employees List
  // describe(`GET ${baseUrl}/`, () => {
  //   it('should return list of employees', async () => {
  //     const res = await chai.request(app)
  //       .get(`${baseUrl}/`)
  //       .set(headers);

  //     res.should.have.status(200);
  //     res.body.should.be.a('object');
  //     res.body.should.have.property('data')
  //       .which
  //       .is
  //       .an('object')
  //       .that
  //       .has
  //       .property('employees')
  //       .which
  //       .is
  //       .an('array');
  //   });

  //   it('should give validation error because parameters [sort_by] can not be empty.', async () => {
  //     const res = await chai.request(app)
  //       .get(`${baseUrl}?sort_by=`)
  //       .set(headers);

  //     res.should.have.status(400);
  //     res.error.should.not.be.false;
  //   });
  // });

  // // Get Employee Details by ID
  // describe(`GET ${baseUrl}/employeeId`, async () => {
  //   it('should return employee details of given ID.', async () => {
  //     const employee = await employeeDetailsModel.findOne();
  //     const res = await chai.request(app)
  //       .get(`${baseUrl}/${employee.id}`)
  //       .set(headers);
  //     res.should.have.status(200);
  //     res.body.should.be.a('object');
  //     res.body.should.have.property('data')
  //       .which
  //       .is
  //       .an('object')
  //       .which
  //       .has
  //       .property('employee');
  //   });

  //   it('should give 404 not found error because data is not exist in DB', async () => {
  //     const lastRowId = await getLastRowId();
  //     const res = await chai.request(app)
  //       .get(`${baseUrl}/${Number(lastRowId) + 1}`)
  //       .set(headers);
  //     res.should.have.status(404);
  //     res.body.should.be.a('object');
  //     res.body.should.have.property('error')
  //       .which
  //       .is
  //       .an('object')
  //       .which
  //       .has
  //       .property('message')
  //       .which
  //       .an('string');
  //   });
  // });

  // // Delete Employee Details by ID
  // describe(`DELETE ${baseUrl}/employeeId`, () => {
  //   it('should delete employee details of a given ID', async () => {
  //     const employee = await employeeDetailsModel.findOne();
  //     const res = await chai.request(app)
  //       .delete(`${baseUrl}/${employee.id}`)
  //       .set(headers);

  //     res.should.have.status(200);
  //     res.body.should.be.a('object');
  //     res.body.should.have.property('data')
  //       .which
  //       .is
  //       .an('object')
  //       .which
  //       .has
  //       .property('employee')
  //       .that
  //       .is
  //       .not
  //       .equal(null);
  //   });

  //   describe('Non existing route', () => {
  //     it('should not return config of note', async () => {
  //       const res = await chai.request(app)
  //         .get('/non-existing-route')
  //         .set(headers);

  //       res.should.have.status(404);
  //       res.body.should.be.a('object');
  //       res.body.should.have.property('error')
  //         .which
  //         .is
  //         .an('object')
  //         .that
  //         .has
  //         .property('message')
  //         .which
  //         .is
  //         .an('string');
  //     });
  //   });
  // });
});
