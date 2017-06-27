const users = require('../controllers/users.controller');

module.exports = (app) => {

  app.post('/signup', users.signup);
  app.post('/signin', users.signin);

  app.get('/logout', (req, res) => {
    req.logout();
    res.redirect("/");
  })

  app.get('/users/:userID/accept', users.accept);

  app.route('/users')
  .get(users.list);

  app.get('/leaderboards', (req, res) => res.redirect("/leaderboards/1"))

  app.get('/leaderboards/:value', (req, res, next) => {
    if(!Number(req.params.value))
      next('Not a number!')
    else
      next()
  })

  app.get('/leaderboards/:pageNum', users.leaderboards)

}
