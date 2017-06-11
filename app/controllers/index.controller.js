var express = require('express'),
    Article = require('mongoose').model('Article');

exports.home =  (req, res, next) => {
  Article.find(function (err, articles) {
    if (err) return next(err);
    res.render('index', {
      title: 'Generator-Express MVC'
    });
  });
};
