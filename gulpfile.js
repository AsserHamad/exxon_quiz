var gulp = require('gulp'),
  nodemon = require('gulp-nodemon'),
  plumber = require('gulp-plumber'),
  livereload = require('gulp-livereload'),
  config = require('./config/config'), {MongoClient} = require('mongodb'), {argv: args} = require('yargs')

mongoose = require('mongoose');
mongoose.connect(config.db),
require('./app/models/user.model');
require('./app/models/match.model');
const User = mongoose.model('User'),
  Match = mongoose.model('Match')

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
  for (let i = 0; i < 80; i++) {

    let matchSeed = new Match({
      quizTaker: mongoose.Types.ObjectId(),
      score: Math.random() * 6000
    })
    console.log('hi');

    ((match, index) => {
      console.log('yo');
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

gulp.task('default', ['develop']);
