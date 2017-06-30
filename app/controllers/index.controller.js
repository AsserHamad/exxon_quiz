const Question = require('mongoose').model('Question');

exports.main = (req, res, next) => {
  if(req.user && req.user.accepted)
    return res.redirect('/home')
  res.render('index', {
    title: 'ExxonMobil',
    layout:false,
    user: req.user
  });
};

exports.home = (req, res, next) => {
  res.render('home', {
    title: "Home Page",
    layout: false,
    userJSON : encodeURIComponent(JSON.stringify(req.user))
  })
};

exports.listQuestions = (req, res , next) => {
  Question.find({}, (err, questions) => {
    res.json(questions);
  })
}
