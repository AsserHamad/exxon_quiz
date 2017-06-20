// Load the test dependencies
const app = require('../../app');
const request = require('supertest');
const should = require('should');
const User = require('mongoose').model('User');



// Define global test variables
let user, article;


function valid(res) {
	return res.body.should.have.property("accepted", true);
}


describe('User Controller Unit Tests:', () => {
	// Define a pre-tests function
	before((done) => {
	// Create a new 'User' model instance
		user = new User({
      firstName: 'Omar',
      lastName: "Hossam",
      email: `moar@exxon.com`,
      role: 'user',
      accepted: true,
      password: `superman`
		});

		// Save the new 'User' model instance
		user.save(() => {
      done();
		});
	});


  it('should be able to login with moar no problemo', function (done) {
    request(app).post('/signin')
    .send({email: 'moar@exxon.com', password: 'superman'})
		.expect(valid)
		.expect(200, done)
  });
});
