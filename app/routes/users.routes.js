const users = require('../controllers/users.controller'),
      passport = require('passport');

module.exports = (app) => {
  app.route('/signup')
  // .get(users.renderSignup)TODO
  .post(users.signup)

  app.route('/signin')
  // .get(users.renderSignin) TODO
  .post(passport.authenticate('local', {
      successRedirect: '/',
			failureRedirect: '/signin',
			failureFlash: true
  }));

  app.route('/users')
  .get(users.list);
}
