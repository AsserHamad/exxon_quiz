const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const MatchSchema = new Schema({
  quizTaker: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    trim: true,
    required: true
  },
  score: {
    type: Number,
    required: true,
    index:true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

MatchSchema.statics.top20 = function(offset, callback) {
  this.find()
  .sort({score: -1 })
  .skip(offset)
  .limit(20)
  .populate('quizTaker', 'firstName lastName email')
  .exec(callback)
}

mongoose.model('Match', MatchSchema);
