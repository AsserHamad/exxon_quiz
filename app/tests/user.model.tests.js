const should = require('should'),
      app = require('../../app'),
      User = require('mongoose').model('User');

describe('User Model Unit Tests:', () => {


  it('Should be able to save a valid account with no problems', (done) => {
    user = new User({firstName: 'Full', lastName: 'Name', email: 'test@exxon.com', password: 'password'});
    user.save((err) => {
      should.not.exist(err);
      done();
    });
  });

  it('Should not be able to save account with non-exxon email', (done) => {
    user = new User({firstName: 'Full', lastName: 'Name', email: 'test@exon.com', password: 'password'});
    user.save((err) => {
      should.exist(err);
      done();
    });
  })

  it('Should not be able to save account with invalid email', (done) => {
    user = new User({firstName: 'Full', lastName: 'Name', email: 'test.com', password: 'password'});
    user.save((err) => {
      should.exist(err);
      done();
    });
  })

  it('Should not be able to save account with duplicate email', (done) => {
    user = new User({firstName: 'Full', lastName: 'Name', email: 'test@exxon.com', password: 'password'});
    user.save((err) => {
      should.exist(err);
      done();
    });
  })

  after((done) => {
    User.remove(() => {
      done();
    })
  })

});
