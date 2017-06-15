exports.home = (req, res, next) => {
  res.render('index', {
    title: 'ExxonMobil',
    user: req.user
  });
};
