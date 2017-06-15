const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

const QuestionSchema = new Schema({
  text: {
    type: String,
    requred: "Quiz Question required.",
    index: true,
    trim: true
  },
  choices: {
    type: [String],
    validate: [(val) => val==4 , 'Please enter 4 choices!']
  },
  correctAnswer: {
    type: String,
    trim: true,
    required: "A correct answer is required."
  }
})

QuestionSchema.pre('save', () => {
  if(choices.contains(this.correctAnswer)){
    next();
  } else {
    next('Quiz correct answer is not in the possbile choices you entered.');
  }
});
