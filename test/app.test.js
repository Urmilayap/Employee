const { describe, it } = require('mocha');
const chai = require('chai');
const app = require('../src/index');

describe('Test app', () => {
  it('it should return "pong"', async () => {
    const response = await chai.request(app)
      .get('/')
      .set({
        'whitelabel-id': 1,
        'account-id': 1,
        'user-id': 1,
      });
    response.body.should.have.property('message').which.to.equal('pong');
  });

//   it('server should return 404 NotFound because route does not exist', async () => {
//     const res = await chai.request(server)
//       .get('/random-route')
//       .set(headers);

//     res.should.have.status(404);
//   });
});
