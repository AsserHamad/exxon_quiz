  const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      AutoIncrement = require('mongoose-sequence'),
      each = require('async-each-series');

const QuestionSchema = new Schema({
  _id: Number,
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
}, {_id: false})

QuestionSchema.pre('save', function (next) {
  if(this.choices.includes(this.correctAnswer)){
    next();
  } else {
    next('Quiz correct answer is not in the possbile choices you entered.');
  }
});

QuestionSchema.statics.randomTen = function(done) {
  var output = []
  var values = []
  var ctxt = this
  var randomNums = []
  // this.count((error, value) => {
  //   for(let i = 0; i<10;) {
  //     let random = Math.floor(Math.random() * value) + 1
  //     if(!randomNums.includes(random)) {
  //       values.push(random)
  //       i++;
  //     }
  //   }
  //     each(values, function (el, next) {
  //       ctxt.findOne({_id: el}, (err,value) => {
  //         console.log(el);
  //         if(!value)
  //           console.log('dooh');
  //         output.push(value)
  //         next()
  //       })
  //     }, function (err) {
  //       console.log('done');
  //       done(output)
  //     })
  //
  //     })
  // TODO: Make this more efficient
  var randomNums = []
  var values = []
    this.find((error, questions) => {
      if(error)
        return done(error);
      for(var i = 0 ; i<10 && i < questions.length ;) {
        let random = Math.floor(Math.random() * questions.length)
            if(!randomNums.includes(random)) {
              values.push(questions[random])
              randomNums.push(random)
              i++;
            }
      }
      done(null, values)
    })
    }

QuestionSchema.plugin(AutoIncrement)

mongoose.model('Question', QuestionSchema);
