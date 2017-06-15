var gulp = require('gulp'),
  nodemon = require('gulp-nodemon'),
  plumber = require('gulp-plumber'),
  livereload = require('gulp-livereload'),
  config = require('./config/config'),
  {MongoClient} = require('mongodb')  ;

gulp.task('develop', function () {
  livereload.listen();
  nodemon({
    script: 'app.js',
    ext: 'js coffee handlebars',
    stdout: false
  }).on('readable', function () {
    this.stdout.on('data', function (chunk) {
      if(/^Express server listening on port/.test(chunk)){
        livereload.changed(__dirname);
      }
    });
    this.stdout.pipe(process.stdout);
    this.stderr.pipe(process.stderr);
  });
});

gulp.task('rmUsers', () => {
  MongoClient.connect(config.db, (err, db) => {
    if(err) console.log(err);
    else {
      db.collection('users').deleteMany(() => {
        process.exit();
      })
    }
  })
})

gulp.task('default', [
  'develop'
]);
