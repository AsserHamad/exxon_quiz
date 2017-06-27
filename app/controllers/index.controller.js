exports.main = (req, res, next) => {
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
    user: req.user
  })
};
