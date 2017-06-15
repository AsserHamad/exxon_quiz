const users = require('../controllers/users.controller'),
      passport = require('passport');

module.exports = (app) => {
  app.route('/signup')
  // .get(users.renderSignup)TODO
  .post(users.signup)

  app.route('/signin')
  // .get(users.renderSignin) TODO
  .post((req, res) => {
    console.log(req.body);
    passport.authenticate('local', (err, user, info) => {
      if(err) return res.json({err: err});
      else if (info) {
        return res.json({info: info});
      } else {
        req.login(user, function(err) {
  				if (err) {
  					res.status(400).json({err: err});
  				} else {
            res.json({success:'success'});
  				}
  			});
      }
    })(req, res);
  })

  app.route('/users')
  .get(users.list);
}
