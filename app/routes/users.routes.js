const users = require('../controllers/users.controller');

module.exports = (app) => {
  app.route('/signup')
  // .get(users.renderSignup)TODO
  .post(users.signup)

  app.route('/signin')
  // .get(users.renderSignin) TODO
  .post(users.signin)

  app.get('/signout', (req, res) => {
    req.logout();
    res.redirect("/");
  })

  app.route('/users')
  .get(users.list);
}
