const matches = require('../controllers/match.controller'),
      {authenticated} = require('../middlewares');

module.exports = (app) => {
    app.get('/newMatch', authenticated, matches.genMatch)
}
