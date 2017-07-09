const express = require('express'),
      glob = require('glob'),
      session = require('express-session'),
      MongoDBStore = require('connect-mongodb-session')(session),
      passport = require('passport'),
      http = require('http'),
      socketio  = require('socket.io'),
      passportSocketIo = require("passport.socketio"),
      // favicon = require('serve-favicon'),
      logger = require('morgan'),
      cookieParser = require('cookie-parser'),
      bodyParser = require('body-parser'),
      compress = require('compression'),
      methodOverride = require('method-override'),
      exphbs  = require('express-handlebars');

module.exports = function(app, config, http) {
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

  // app.use(favicon(config.root + '/public/img/ex.ico'));
  app.use(logger('dev'));

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));

  const store =  new MongoDBStore({
    uri: config.db,
    collection: 'mySessions'
  })

  app.use(session({
    store: store,
		saveUninitialized: true,
		resave: true,
		secret: config.app.sessionSecret
	}));

  const io = socketio(http);

  io.use((socket, next) => {
    cookieParser(config.app.sessionSecret)(socket.request, {},(err) => {
    const	sessionId	=	socket.request.signedCookies['connect.sid'];
    store.get(sessionId, (err, session) => {
      socket.request.session = session
      passport.initialize()(socket.request, {}, () => {
        passport.session()(socket.request, {}, () => {
          if(socket.request.user) {
            next(null, true);
          } else {
            next(new Error('user not authenticated', false))
          }
        })
      })
    })
  })
  })

  io.on('connection', function (socket) {


    if(Object.keys(io.sockets.adapter.rooms).length === 0 && io.sockets.adapter.rooms.constructor === Object) {
      socket.join('room1')
      io.to('room1').emit('start', 'hello people welcome to room1')
    }
    else {
      var largest = 'room0'
      for (i in io.sockets.adapter.rooms) {
        if(io.sockets.adapter.rooms[i].length < 5) {
          socket.join(io.sockets.adapter.rooms[i])
          return;
        } else {
          if(i > largest)
            largest = i;
        }
      }
      var arr = largest.split("")
      var lastValue = arr.pop();
      var room = arr.join("") + (Number(lastValue) + 1)
      socket.join(room)
    }

  })


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
