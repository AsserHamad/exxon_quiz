const express = require('express'),
      glob = require('glob'),
      session = require('express-session'),
      MongoDBStore = require('connect-mongodb-session')(session),
      passport = require('passport'),
      favicon = require('serve-favicon'),
      logger = require('morgan'),
      cookieParser = require('cookie-parser'),
      bodyParser = require('body-parser'),
      compress = require('compression'),
      methodOverride = require('method-override'),
      exphbs  = require('express-handlebars');

module.exports = function(app, config, mongoose) {
  var env = process.env.NODE_ENV || 'development';
  app.locals.ENV = env;
  app.locals.ENV_DEVELOPMENT = env == 'development';

  app.engine('handlebars', exphbs({
    layoutsDir: config.root + '/app/views/layouts/',
    defaultLayout: 'main',
    partialsDir: [config.root + '/app/views/partials/']
  }));
  app.set('views', config.root + '/app/views');
  app.set('view engine', 'handlebars');

  app.use(favicon(config.root + '/public/img/ex.ico'));

  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));

  app.use(session({
    store: new MongoDBStore({
      uri: config.db,
      collection: 'mySessions'
    }),
		saveUninitialized: true,
		resave: true,
		secret: config.app.sessionSecret
	}));

  app.use(passport.initialize());
  app.use(passport.session());

  app.use(cookieParser());
  app.use(compress());
  app.use(express.static(config.root + '/public'));
  app.use(methodOverride());

  var routes = glob.sync(config.root + '/app/routes/*.js');
  routes.forEach(function (route) {
    require(route)(app);
  });

  app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  if(app.get('env') === 'development'){
    app.use(function (err, req, res, next) {
      console.log('da status is ' + err.status);
      if(err.status == 404) err.message = "Not Found :/"
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        layout: false,
        status: err.status,
        title: err.status+' Error'
      });
    });
  }

  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        layout: false,
        error: {},
        title: 'error'
      });
  });

  return app;
};
