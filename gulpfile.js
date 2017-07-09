var gulp = require('gulp'),
  nodemon = require('gulp-nodemon'),
  plumber = require('gulp-plumber'),
  livereload = require('gulp-livereload'),
  config = require('./config/config'), {MongoClient} = require('mongodb'), {argv: args} = require('yargs'),
  each = require('async-each-series');


mongoose = require('mongoose');
mongoose.connect(config.db),
require('./app/models/user.model');
require('./app/models/match.model');
require('./app/models/question.model');

const User = mongoose.model('User'),
  Match = mongoose.model('Match'),
  Question = mongoose.model('Question')
  gulp.task('develop', function() {
    livereload.listen();
    nodemon({script: 'app.js', ext: 'js coffee handlebars', stdout: false}).on('readable', function() {
      this.stdout.on('data', function(chunk) {
        if (/^Express server listening on port/.test(chunk)) {
          livereload.changed(__dirname);
        }
      });
      this.stdout.pipe(process.stdout);
      this.stderr.pipe(process.stderr);
    });
  });

  gulp.task('rmUsers', () => {
    MongoClient.connect(config.db, (err, db) => {
      if (err)
        console.log(err);
      else {
        if (args.f) {
          db.collection('users').deleteMany(() => {
            process.exit();
          })
        } else {
          db.collection('users').deleteMany({
            email: {
              $ne: 'admin@exxon.com'
            }
          }, () => {
            process.exit();
          })
        }
      }
    })
  })

  gulp.task('rmMatches', () => {
    MongoClient.connect(config.db, (err, db) => {
      if (err)
        console.log(err);
      else {
          db.collection('matches').deleteMany(() => {
            process.exit();
          })
      }
    })
  })

  // gulp.task('genNormalQuestions', () => {
  //   const question1 = ;
  //   const question1 = ;
  //   const question1 = ;
  //   const question1 = ;
  //   const question1 = ;
  //   const question1 = ;
  //   const question1 = ;
  //   const question1 = ;
  //   const question1 = ;
  //
  // })

  gulp.task('mkadmin', () => {
    const user = new User({
      firstName: 'Master',
      lastName: 'Admin',
      email: 'admin@exxon.com',
      role: 'admin',
      accepted: true,
      password: config.app.adminPass
    });

    user.save((err, doc) => {
      if (err)
        console.log(err);
      else {
        console.log(doc);
      }
      process.exit();
    })
  })

  gulp.task('genUsers', () => {
    let success = 0,
      failure = 0;

    let saves = [];

    for (let i = 0; i < 50; i++) {

      var accepted = (Math.random() <= 0.5)
        ? true
        : false;
      const userSeed = new User({
        firstName: `firstName${i}`,
        lastName: `lastName${i}`,
        email: `user${i}@exxon.com`,
        role: 'user',
        accepted: accepted,
        password: `userpass${i}`
      });

      ((user, i) => {
        user.save((err, user) => {
          if (!err && user) {
            success++;
          } else {
            failure++;
          }
        })
      })(userSeed, i)

      accepted = (Math.random() <= 0.5)
        ? true
        : false;

      const adminSeed = new User({
        firstName: `firstName${i}`,
        lastName: `lastName${i}`,
        email: `admin${i}@exxon.com`,
        role: 'admin',
        accepted: accepted,
        password: `adminpass${i}`
      });

      ((admin, i) => {
        admin.save((err, user) => {
          if (!err && user) {
            success++;
          } else {
            console.log(err);
            failure++;
          }
          if (i == 49) {
            console.log('bye!');
            process.exit();
          }
        })
      })(adminSeed, i)
    }

  })

  gulp.task('genMatches', () => {
    User.findSafely({}, (err, users) => {
      for (let i in users) {
        let matchSeed = new Match({
          quizTaker: users[i]._id,
          score: Math.random() * 6000
        })
        console.log('hmm');
        ((match, index) => {
          match.save((err, value) => {
            if(err)
              console.log('woah '+ err);
            if (index == 79) {
              console.log('bye mate!');
              process.exit();
            }
          })
        })(matchSeed, i)
      }
    })
  })

  gulp.task('genQuestions', () => {

    let questions = []
    for (let i = 0; i < 50; i++) {

      const questionSeed = new Question({
        text: `Who is employee #${i}?`,
        choices: ['Frog', 'Cat', 'Bat', 'Human duuh'],
        correctAnswer:'Human duuh'
      });
      questions.push(questionSeed)
    }

    each(questions, function(el, next) {
      el.save((err, question) => {
        if(!err && question)
          console.log('hi');
        next();
      })
      }, function (err) {
      console.log('finished');
      process.exit();
  });
    })

  gulp.task('default', ['develop']);
