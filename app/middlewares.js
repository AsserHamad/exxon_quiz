function authorized(user) {
  return user && user.accepted
}

exports.authenticated = (req, res, next) => {
  if(!authorized(req.user)) {
    next({message:"Unauthorized", status: 401})
  } else {
    next();
  }
}

exports.authorizedAdmin = (req, res, next) => {
  if(authorized(req.user) && req.user.role == 'admin') {
    next();
  } else {
    next({message:"Unauthorized", status: 401});
  }
}
