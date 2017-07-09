const index = require('../controllers/index.controller'),
      {authenticated} = require('../middlewares.js');

module.exports = (app) => {

  console.log('in the rouuutes');

  app.get('/', index.main);
  //TODO: Uncomment
  app.get('/home', authenticated, index.home)

  app.get('/questions', index.listQuestions)
}
