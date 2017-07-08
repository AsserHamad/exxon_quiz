const matches = require('../controllers/match.controller'),
      {authenticated} = require('../middlewares');
      // match =

module.exports = (app) => {
    app.post('/match', authenticated, matches.postMatch)

}
