const mongoose = require('mongoose')
  User = mongoose.model('User'),
  passport = require('passport'),
  Match = mongoose.model('Match')

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
        if (err.errors[errName].message)
          message = err.errors[errName].message;
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
        return res.status(401).json({
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
            // res.json({success: 'success'});
            res.status(200).json({accepted: false, not_accepted: 'Thx for signing up, now wait for the acceptance ;)'});
          }
        });
      }
    });
  }

  exports.signin = (req, res) => {
    passport.authenticate('local', (err, user, info) => {
      if (err)
        return res.json({err: err});
      else if (info) {
        return res.status(400).json({info: info});
      } else {
        req.login(user, function(err) {
          if (err) {
            console.log(err);
            res.status(400).json({err: err});
          } else if (!user.accepted) {
            // TODO: render the new view (res.render('newView',{user:user}))
            res.json({accepted: false, not_accepted: 'Please wait for your account to be accepted by an admin'});
          } else {
            res.json({accepted: true, user: user});
          }
        });
      }
    })(req, res);
  }

  exports.list = (req, res) => {
    User.findSafely({}, (err, users) => {
      if (err)
        res.status(500).send(err);
      else
        res.json(users);

      }
    )
  }

  exports.accept = (req, res) => {
    console.log(req.params.userID);

      User.findOne({
        _id: req.params.userID
      }, (err, user) => {
        if (err) {
          console.log('err from acceptance' + err);
          res.status(500).send('something went wrong');
        } else if (!user) {
          res.status(404).send("unkown user!");
        } else {
          user.accepted = true;
          user.save(() => {
            res.send("Accepted!");
          })
        }
      })
  }

  exports.leaderboards = (req, res, next) => {
    console.log('yoo');
    Match.count((error, value) => {
      if (req.params.pageNum * 20 > value)
        return next({status: 404}); // change next to json if you want to handle this dynamically

      if (req.params.pageNum == 1)
        Match.top20(0, (err, values) => {
          res.json({values: values, count: value})
        })
      else {
        Match.top20(((req.params.pageNum) - 1) * 20, (err, values) => {
          res.json({values: values})
        })
      }
    })
  }
