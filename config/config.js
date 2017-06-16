var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'exxon-quiz',
      sessionSecret: "shhsecreeet",
      adminPass: "admin55"
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/exxon-quiz-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'exxon-quiz',
      sessionSecret: "shhsecreeet",
      adminPass: "admin55"
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/exxon-quiz-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'exxon-quiz',
      sessionSecret: "shhsecreeet",
      adminPass: "admin55"
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/exxon-quiz-production'
  }
};

module.exports = config[env];
