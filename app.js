 var express = require('express'),
  config = require('./config/config'),
  glob = require('glob'),
  mongoose = require('mongoose');

var db1 = mongoose.connect(config.db);

var db = mongoose.connection;
db.on('error', function() {
  throw new Error('unable to connect to database at ' + config.db);
});

var models = glob.sync(config.root + '/app/models/*.js');
models.forEach(function(model) {
  require(model);
});

var app = express();
var http = require('http').Server(app);

require('./config/passport')(); // Initialize passport
require('./config/express')(app, config, http); // Initialize express

http.listen(config.port, function() {
  console.log('Express server listening on port ' + config.port);
});

module.exports = app;
