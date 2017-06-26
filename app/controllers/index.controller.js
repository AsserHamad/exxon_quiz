exports.main = (req, res, next) => {
  console.log(req.user);
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
