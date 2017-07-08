const users = require('../controllers/users.controller'),
      middlewares = require('../middlewares.js'),
      {authenticated} = middlewares,
      {authenticatedMatching} = middlewares,
      {authorizedAdmin} = middlewares

module.exports = (app) => {

  app.post('/signup', users.signup);
  app.post('/signin', users.signin);

  app.get('/logout', (req, res) => {
    req.logout();
    res.redirect("/");
  })

  app.get('/users/:userID/accept', authorizedAdmin, users.accept);
  app.get('/users/:userID/topscore', authenticatedMatching, users.topScore);


  app.get('/users', users.list);

  app.get('/leaderboards/:value', (req, res, next) => {
    if(!Number(req.params.value))
      next({status:404, message: "not found :/"})
    else
      next()
  })
  //TODO: Uncomment
  app.get('/leaderboards/:pageNum', /*authenticated,*/ users.leaderboards)

  app.get('/leaderboards', (req, res) => res.redirect("/leaderboards/1"))

  //app.post('/mytop', users.myTopScore)
}
