const { Op } = require('sequelize');
const { describe, it, after } = require('mocha');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../src/index');
const { sequelizeManager } = require('../src/managers');
const {employeeDetailsController} = require('../src/controllers')

const { employeeDetailsModel } = sequelizeManager;

chai.use(chaiHttp);

// eslint-disable-next-line no-unused-vars
const should = chai.should();
let employeeId ="";

const headers = {
  'whitelabel-id': 1,
  'account-id': 1,
  'user-id': 1,
};
const gt255 = `This website stores cookies on your computer. 
These cookies are used to collect information about how you interact with our website and 
allow us to remember you.We use this information in order to improve and customize your 
browsing experience and for analytics and metrics about our visitors both on this website and other media`;

const baseUrl = '/employees';

// const createTestData = async () => employeeDetailsModel.bulkCreate([{
//     first_name: `test-${Math.floor(100000 + Math.random() * 900000)}`,
//     account_id: 1,
//     status: 1,
//   }, {
//     last_name: `test-${Math.floor(100000 + Math.random() * 900000)}`,
//     account_id: 1,
//     status: 1,
//   },
//   {
//     email_id: `test-${Math.floor(100000 + Math.random() * 900000)}`,
//     account_id: 1,
//     status: 2,
//   }, {
//     phone_no: `test-${Math.floor(100000 + Math.random() * 900000)}`,
//     account_id: 1,
//     status: 2,
//   }, {
//     address: `test-${Math.floor(100000 + Math.random() * 900000)}`,
//     account_id: 1,
//     status: 2,
//   },{
//     name: `test-${Math.floor(100000 + Math.random() * 900000)}`,
//     account_id: 1,
//     deleted: 1,
//     deleted_at: new Date(),
//   }]);

//   const createOne = async () => employeeDetailsModel.create({
//     name: 'test',
//     account_id: 1,
//     status: 2,
//   });
  
//   const getOne = async ({ status, account_id = 1 }) =>  employeeDetailsModel.findOne({
//     where: {
//       account_id,
//       status,
//     },
//   });

//   const getLastRowId = async () => employeeDetailsModel.max('id');


//   const getList = async ({ account_id = 1, limit = 10 }) =>employeeDetailsModel.findAll({
//     where: {
//       account_id,
//     },
//     limit,
//   });
  
//   const deleteAll = async ({ account_id = 1 }) => employeeDetailsModel.destroy({
//     where: {
//       account_id,
//     },
//   });


  describe('EmployeeDetails Test Suit', async () => {
    describe(`POST ${baseUrl}/register`, () => {
      it('should create a employee. ', async () => {
        const body = {
          "first_name":"Urmila",
          "last_name": "Sheral",
          "email_id":"urmila@gmail.com",
          "phone_no": "25647912",
          "address": "Solapur,Maharashtra"
        };
        const res = await chai.request(app)
          .post(`${baseUrl}/register`)
          .set(headers)
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
          "first_name": "",
          "last_name": " "
        };
  
        const res = await chai
          .request(app)
          .post(`${baseUrl}/register`)
          .send(body)
          .set(headers);
  
        res.should.have.status(400);
        res.error.should.not.be.false;
      });
  
      it('should give validation error because first-name is not string.', async () => {
        const body = {
          "first_name": "12562",
        };
  
        const res = await chai
          .request(app)
          .post(`${baseUrl}/register`)
          .send(body)
          .set(headers);
        res.should.have.status(400);
        res.error.should.not.be.false;
      });
  
      it('should give validation error because body contains a unknown field [xyz].', async () => {
        const body = {
          "department":"Testing",
        };
  
        const res = await chai
          .request(app)
          .post(`${baseUrl}/register`)
          .send(body)
          .set(headers);
  
        res.should.have.status(400);
        res.error.should.not.be.false;
      });
  
      it.only('should give validation error because first-name length is greater than 255 characters.', async () => {
        const body = {
          "first_name": gt255,
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
  

    describe(`PUT ${baseUrl}/:employeeId`, () => {
        it('should update first-name of employee of given id.', async () => {
          const input ={
            "first_name":"Divya",
          }
          const res = await chai.request(app)
            .put(`${baseUrl}/${employeeId}`)
            .set(headers)
            .send(input);
    
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
            .an('object')
            .that
            .has
            .property('first_name')
            .which
            .is
            .equal(input.first_name);
        });
    
        // it('should update a employee last-name of given id.', async () => {
        //   const tempBody = {
        //     name: String(Math.floor(100000 + Math.random() * 900000)),
        //     version: 2,
        //   };
        //   const res = await chai.request(app)
        //     .put(`${baseUrl}/${employee.id}`)
        //     .set(headers)
        //     .send(tempBody);
    
        //   res.should.have.status(200);
        //   res.body.should.be.a('object');
        //   res.body.should.have.property('data')
        //     .which
        //     .is
        //     .an('object')
        //     .that
        //     .has
        //     .property('employee')
        //     .which
        //     .is
        //     .an('object')
        //     .that
        //     .has
        //     .property('name')
        //     .which
        //     .is
        //     .equal(tempBody.name);
        // });

        // it('should update a employee email-id of given id.', async () => {
        //     const employee = await getOne({
        //       status: 1,
        //     });
      
        //     const tempBody = {
        //       name: String(Math.floor(100000 + Math.random() * 900000)),
        //       version: 2,
        //     };
        //     const res = await chai.request(app)
        //       .put(`${baseUrl}/${employee.id}`)
        //       .set(headers)
        //       .send(tempBody);
      
        //     res.should.have.status(200);
        //     res.body.should.be.a('object');
        //     res.body.should.have.property('data')
        //       .which
        //       .is
        //       .an('object')
        //       .that
        //       .has
        //       .property('employee')
        //       .which
        //       .is
        //       .an('object')
        //       .that
        //       .has
        //       .property('name')
        //       .which
        //       .is
        //       .equal(tempBody.name);
        //   });

        // it('should update a employee phone-no of given id.', async () => {
        //     const employee = await getOne({
        //       status: 1,
        //     });
      
        //     const tempBody = {
        //       name: String(Math.floor(100000 + Math.random() * 900000)),
        //       version: 2,
        //     };
        //     const res = await chai.request(app)
        //       .put(`${baseUrl}/${employee.id}`)
        //       .set(headers)
        //       .send(tempBody);
      
        //     res.should.have.status(200);
        //     res.body.should.be.a('object');
        //     res.body.should.have.property('data')
        //       .which
        //       .is
        //       .an('object')
        //       .that
        //       .has
        //       .property('employee')
        //       .which
        //       .is
        //       .an('object')
        //       .that
        //       .has
        //       .property('name')
        //       .which
        //       .is
        //       .equal(tempBody.name);
        //   });  
    
        // it('should update a employee address of given id.', async () => {
        //   const employee = await getOne({
        //     status: 1,
        //   });
    
        //   const tempBody = {
        //     description: String(Math.floor(100000 + Math.random() * 900000)),
        //     version: 3,
        //   };
        //   const res = await chai.request(app)
        //     .put(`${baseUrl}/${employee.id}`)
        //     .set(headers)
        //     .send(tempBody);
    
        //   res.should.have.status(200);
        //   res.body.should.be.a('object');
        //   res.body.should.have.property('data')
        //     .which
        //     .is
        //     .an('object')
        //     .that
        //     .has
        //     .property('employee')
        //     .which
        //     .is
        //     .an('object')
        //     .that
        //     .has
        //     .property('description')
        //     .which
        //     .is
        //     .equal(tempBody.description);
        // });
    
        // it.only('should return 412 preconditionfailed error because new version', async () => {
        
        //   const res = await chai.request(app)
        //     .put(`${baseUrl}/${employee.id}`)
        //     .set(headers)
        //     .send(body);
    
        //   res.should.have.status(412);
        //   res.body.should.be.a('object');
        //   res.body.should.have.property('error')
        //     .which
        //     .is
        //     .an('object')
        //     .that
        //     .has
        //     .property('message')
        //     .which
        //     .is
        //     .an('string');
        // });
    
        it('should return NotFound error.', async () => {
          const res = await chai.request(app)
            .put(`${baseUrl}/${ employeeId }`)
            .set(headers)
            .send(body);
    
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('error')
            .which
            .is
            .an('object')
            .that
            .has
            .property('code')
            .which
            .is
            .an('number')
            .which
            .is
            .equal(404);
        });

  describe(`GET ${baseUrl}/`, () => {
        it.only('should return list of employees', async () => {
          const res = await chai.request(app)
            .get(`${baseUrl}/`)
            .set(headers);
    
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
            .an('array');
        });

    //   it('should give validation error because parameters [sort_by] can not be empty.', async () => {
    //     const res = await chai.request(app)
    //       .get(`${baseUrl}?sort_by=`)
    //       .set(headers);
  
    //     res.should.have.status(400);
    //     res.error.should.not.be.false;
    //   });

      it('should give validation error because status can not be more than 2', async () => {
        const res = await chai
          .request(app)
          .get(`${baseUrl}?status=6`)
          .set(headers);
  
        res.should.have.status(400);
        res.error.should.not.be.false;
      });
  
      it('should give validation error because status can not be a decimal value.', async () => {
        const res = await chai
          .request(app)
          .get(`${baseUrl}?status=22.45`)
          .set(headers);
  
        res.should.have.status(400);
        res.error.should.not.be.false;
      });
  
      it('should give validation error because status can not be a negative value.', async () => {
        const res = await chai
          .request(app)
          .get(`${baseUrl}?status=-1`)
          .set(headers);
  
        res.should.have.status(400);
        res.error.should.not.be.false;
      });
  
      it('should give validation error because status can not be other than 0, 1 or 2.', async () => {
        const res = await chai
          .request(app)
          .get(`${baseUrl}?status=167445774435678`)
          .set(headers);
  
        res.should.have.status(400);
        res.error.should.not.be.false;
      });

    describe(`GET ${baseUrl}/employeeId`, async () => {
        it('should return one employee of given id.', async () => {
          const employee = await getOne({
            status: 1,
          });
          const res = await chai.request(app)
            .get(`${baseUrl}/${employee.id}`)
            .set(headers);
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('data')
            .which
            .is
            .an('object')
            .which
            .has
            .property('employee');
        });
    
        it('should give 404 not found error because data is not exist in DB', async () => {
          const lastRowId = await getLastRowId();
          const res = await chai.request(app)
            .get(`${baseUrl}/${Number(lastRowId) + 1}`) // or Any imaginary number, which should not exists as note id.
            .set(headers);
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('error')
            .which
            .is
            .an('object')
            .which
            .has
            .property('message')
            .which
            .is
            .an('string');
        });
    
        it('should give 404 not found error because given id is a deleted note.', async () => {
          const employee = await getDeletedOne();
          const res = await chai.request(app)
            .get(`${baseUrl}/${employee.id}`)
            .set(headers);
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('error')
            .which
            .is
            .an('object')
            .which
            .has
            .property('message')
            .which
            .is
            .an('string');
        });
      });

    describe(`DELETE ${baseUrl}/employeeId`, () => {
        it('should delete one of given id', async () => {
          const employee = await getOne({
            status: 2,
          });
          const res = await chai.request(app)
            .delete(`${baseUrl}/${employee.id}`)
            .set(headers);
    
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('data')
            .which
            .is
            .an('object')
            .which
            .has
            .property('employee')
            .that
            .has
            .property('deleted_at')
            .which
            .is
            .not
            .equal(null);
        });
    
        it('should give 412 precondition error because enable employee can not be deleted.', async () => {
          const employee = await getOne({
            status: 1,
          });
          const res = await chai.request(app)
            .delete(`${baseUrl}/${employee.id}`)
            .set(headers);
    
          res.should.have.status(412);
    
          res.body.should.be.a('object');
          res.body.should.have.property('error')
            .which
            .is
            .an('object')
            .that
            .has
            .property('message')
            .which
            .is
            .an('string');
        });
        it('should give precondition failed  because enable employee can not be deleted and force update is not provided.', async () => {
          const employee = await getOne({
            status: 1,
          });
          const preReq = await chai.request(app)
            .delete(`${baseUrl}/${employee.id}`)
            .set(headers);
          console.log('preReq.body');
          console.log(JSON.stringify(preReq.body));
          const { recovery } = preReq.body.error;
    
          let forceOption = {};
          recovery.options.forEach((option) => {
            if (option.name === 'force') {
              forceOption = option;
            }
          });
          console.log('FFFF', forceOption);
          console.log(forceOption.recovery_param.path);
          const res = await chai.request(app)
            .delete(`${forceOption.recovery_param.path}`)
            .set(headers);
          res.body.should.be.a('object');
          res.body.should.have.property('error')
            .which
            .is
            .an('object')
            .that
            .has
            .property('message')
            .which
            .is
            .an('string');
        });

        it('should  delete  because enable employee can be deleted with force_update option.', async () => {
            const employee = await getOne({
              status: 1,
            });
            const preReq = await chai.request(app)
              .delete(`${baseUrl}/${employee.id}`)
              .set(headers);
            console.log('preReq.body');
            console.log(JSON.stringify(preReq.body));
            const { recovery } = preReq.body.error;
      
            let forceOption = {};
            recovery.options.forEach((option) => {
              if (option.name === 'force') {
                forceOption = option;
              }
            });
            console.log('FFFF', forceOption);
            console.log(forceOption.recovery_param.path);
            const res = await chai.request(app)
              .delete(`${forceOption.recovery_param.path}?force_update=true`)
              .set(headers);
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('data')
              .which
              .is
              .an('object')
              .which
              .has
              .property('employee')
              .that
              .has
              .property('deleted_at')
              .which
              .is
              .not
              .equal(null);
          });
    });
});
  });
});