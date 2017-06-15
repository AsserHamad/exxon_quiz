const User = require('mongoose').model('User'),
      passport = require('passport');

const getErrorMessage = function(err, unique) {
	// Define the error message variable
	let message = '';

	// If an internal MongoDB error occurs get the error message
	if (err.code) {
		switch (err.code) {
			// If a unique index error occurs set the message error
			case 11000:
			case 11001:
				message = unique;
				break;
			// If a general error occurs set the message error
			default:
				message = 'Something went wrong';
		}
	} else {
		// Grab the first error message from a list of possible errors
		for (const errName in err.errors) {
			if (err.errors[errName].message) message = err.errors[errName].message;
		}
	}

	// Return the message error
	return message;
};

exports.signup = (req, res) => {
	const user = new User(req.body);

	// Try saving the User
	user.save((err) => {
		if (err) {
			return res.status(400).send({
				message: getErrorMessage(err, 'An account with this email already exists')
			});
		} else {
			// Remove sensitive data before login
			user.password = undefined;
			user.salt = undefined;
			// Login the user
			req.login(user, function(err) {
				if (err) {
					res.status(400).send(err);
				} else {
					res.json(user);
				}
			});
		}
	});
}


exports.list = (req, res) => {
  User.find({},(err, users) => {
    if(err)
      res.status(500).send(err);
    else{
      users.forEach((user) => {
        user.password = undefined;
        user.salt = undefined;
      })
      res.json(users);
    }
  })
}
