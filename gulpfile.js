var gulp = require('gulp'),
  nodemon = require('gulp-nodemon'),
  plumber = require('gulp-plumber'),
  livereload = require('gulp-livereload'),
  config = require('./config/config'),
  {MongoClient} = require('mongodb'),
  {argv: args} = require('yargs');

mongoose = require('mongoose');
mongoose.connect(config.db),
require('./app/models/user.model');
const User = mongoose.model('User');

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
      if(args.f) {
      db.collection('users').deleteMany(() => {
        process.exit();
      })
    } else {
        db.collection('users').deleteMany({email: {$ne: 'admin@exxon.com'}}, () => {
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

gulp.task('default', ['develop']);
