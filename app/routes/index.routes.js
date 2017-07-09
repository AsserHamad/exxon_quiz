const index = require('../controllers/index.controller'),
      users = require('../controllers/users.controller'),
      middlewares = require('../middlewares.js'),
      {authenticated} = middlewares,
      {authorizedAdmin} = middlewares;

module.exports = (app) => {

  app.get('/', index.main);

  app.get('/test', index.test);

  //TODO: Uncomment
  app.get('/home', authenticated, index.home)

  app.route('/questions')
  .get(index.listQuestions)
  .post(authorizedAdmin, users.addQuestion);

}
