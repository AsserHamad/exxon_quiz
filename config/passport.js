const passport = require('passport'),
      mongoose = require('mongoose'),
      {Strategy:LocalStrategy} = require('passport-local');

// Define the Passport configuration method
module.exports = function() {
	// Load the 'User' model
	const User = mongoose.model('User');

	// Use Passport's 'serializeUser' method to serialize the user id
	passport.serializeUser((user, done) => {
		done(null, user.id);
	});

	// Use Passport's 'deserializeUser' method to load the user document
	passport.deserializeUser((id, done) => {
		User.findOne({
			_id: id
		}, '-password -salt', (err, user) => {
			done(err, user);
		});
	});

  	// Use the Passport's Local strategy
  	passport.use(new LocalStrategy({usernameField: 'email'},((email, password, done) => {
      console.log('za password '+ password);
  		// Use the 'User' model 'findOne' method to find a user with the current username
  		User.findOne({
  			email: email
  		}, (err, user) => {
  			// If an error occurs continue to the next middleware
  			if (err) {
  				return done(err);
  			}

  			// If a user was not found, continue to the next middleware with an error message
  			if (!user) {
  				return done(null, false, {
  					message: 'Unknown User'
  				});
  			}

  			// If the passport is incorrect, continue to the next middleware with an error message
  			if (!user.authenticate(password)) {
          console.log('hiii');
  				return done(null, false, {
  					message: 'Invalid Password'
  				});
  			} else {
          console.log('yess wohoooo');
        }

  			// Otherwise, continue to the next middleware with the user object
        user.salt = null;
        user.password = null;
  			return done(null, user);
  		});
  	})));
  };
