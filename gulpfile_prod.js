const gulp = require('gulp'),
    config = require('./config/config');
    mongoose = require('mongoose');
    mongoose.connect(config.db);
    require('./app/models/user.model');

const User = mongoose.model('User');


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
