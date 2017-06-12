const users = require('../controllers/users.controller');

module.exports = (app) => {
  app.post('/signup', users.signup);

  app.route('/users')
  .get(users.list);
}
