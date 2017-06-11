const index = require('../controllers/index.controller');

module.exports = (app) => {
  app.get('/', index.home);
}
