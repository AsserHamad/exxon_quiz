var express = require('express');

exports.home = (req, res, next) => {
  res.render('index', {
    title: 'Generator-Express MVC',
    user: req.user
  });
};
