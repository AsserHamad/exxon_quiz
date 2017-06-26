const index = require('../controllers/index.controller');

module.exports = (app) => {
  app.get('/', index.main);

  app.get('/', index.home)
}
