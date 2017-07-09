const mongoose = require('mongoose')
  Match = mongoose.model('Match');

exports.postMatch = (req, res, next) => {
  const match = new Match({quizTaker: req.user._id, score: req.body.score})
  match.save((error, match) => {
    console.log(error);
    console.log('hooray');
    if(!error)
    res.json({success: true})
    else {
      res.status(500).json({error: "err"});
    }
  })
}
