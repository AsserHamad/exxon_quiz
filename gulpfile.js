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
