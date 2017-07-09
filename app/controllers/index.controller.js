const Question = require('mongoose').model('Question');

exports.main = (req, res, next) => {
  console.log('in index');
  if(req.user && req.user.accepted)
    return res.redirect('/home')
  res.render('index', {
    title: 'ExxonMobil',
    layout:false,
    user: req.user
  });
};

exports.home = (req, res, next) => {
  console.log('the user is ' + req.user);
  res.render('home', {
    title: "Home Page",
    layout: false,
    userJSON : encodeURIComponent(JSON.stringify(req.user))
  })
};

exports.listQuestions = (req, res , next) => {
  Question.randomTen((questions) => {
    res.json(questions);
  })
}
