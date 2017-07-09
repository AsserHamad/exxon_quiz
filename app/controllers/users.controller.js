const mongoose = require('mongoose')
  User = mongoose.model('User'),
  passport = require('passport'),
  Match = mongoose.model('Match'),
  Question = mongoose.model('Question');

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
    console.log('the signup attempt ' + JSON.stringify(req.body));
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
    console.log(' the login attempt ' +JSON.stringify(req.body));
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
            console.log('hiii');
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
      User.update({
        _id: req.params.userID
      }, { $set: { accepted: true }}, () => {
        console.log('hi');
        res.json({accepted: true})
      })
  }

  exports.leaderboards = (req, res, next) => {
    console.log('yoo');
    Match.count((error, value) => {
      if(error)
        return res.status(500).json({error: 'err'});

      // if (req.params.pageNum  * 20 > value)
      //   return res.status(404).json({res: 'not found'}); // change next to json if you want to handle this dynamically
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

  exports.topScore = (req, res) => {
    Match.find({quizTaker: req.user})
    .sort({score: -1})
    .limit(1)
    .exec((err, records) => {
      if(err)
        return res.status(500).json({});
      if(!records || !records.length > 0)
        return res.status(404).json({})
      var score = records[0].score;
      Match.find({score:{$gt: score}}, (error, matches) => {
        let count = matches.length;
        res.json({score:score, ranking: count + 1})
      })
    })
  }

  exports.addQuestion = (req, res) => {
    const choices = [req.body.choice1, req.body.choice2, req.body.choice3, req.body.choice4]
    const newQuestion = new Question({
      text: req.body.text,
      choices: choices,
      correctAnswer: req.body.correctAnswer
    })

    newQuestion.save((error, question) => {
      console.log(error);
      if(!error)
        res.json({response: 'thank you'});
      else {
        res.status(500).json({error: 'there is an error'})
      }
    })
  }

  exports.unacceptedUsers = (req, res) => {
    User.findSafely({accepted: false}, (error, users) => {
      res.json(users)
    })
  }
