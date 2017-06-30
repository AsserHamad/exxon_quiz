const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      {db} = require('../../config/config'),
      autoIncrement = require('mongoose-auto-increment');
      var connection = mongoose.createConnection(db)
      autoIncrement.initialize(connection);

const QuestionSchema = new Schema({
  text: {
    type: String,
    requred: "Quiz Question required.",
    index: true,
    trim: true
  },
  choices: {
    type: [String],
    validate: [(val) => val.length == 4 , 'Please provide 4 choices!']
  },
  correctAnswer: {
    type: String,
    trim: true,
    required: "A correct answer is required."
  }
})

QuestionSchema.pre('save', function (next) {
  if(this.choices.includes(this.correctAnswer)){
    next();
  } else {
    next('Quiz correct answer is not in the possbile choices you entered.');
  }
});

QuestionSchema.plugin(autoIncrement.plugin, 'Question')

mongoose.model('Question', QuestionSchema);
