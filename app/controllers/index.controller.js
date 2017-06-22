exports.home = (req, res, next) => {
  console.log(req.user);
  res.render('index', {
    title: 'ExxonMobil',
    layout:false,
    user: req.user
  });
};
