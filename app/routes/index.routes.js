const index = require('../controllers/index.controller'),
      {authenticated} = require('../middlewares.js');

module.exports = (app) => {
  app.get('/', index.main);

  app.get('/home', /*authenticated,*/ index.home)

  app.get('/questions', index.listQuestions)
}
