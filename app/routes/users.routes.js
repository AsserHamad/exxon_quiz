const users = require('../controllers/users.controller');

module.exports = (app) => {

  app.post('/signup', users.signup);
  app.post('/signin', users.signin);

  app.get('/signout', (req, res) => {
    req.logout();
    res.redirect("/");
  })

  app.route('/users')
  .get(users.list);
}
