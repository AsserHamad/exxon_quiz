// Load the module dependencies
const mongoose = require('mongoose'),
      crypto = require('crypto'),
      Schema = mongoose.Schema;

// Define a new 'UserSchema'
const UserSchema = new Schema({
	firstName: String,
	lastName: String,
	email: {
		type: String,
    required: 'Email is required',
    unique: true,
    trime: true,
		// Validate the email format
		match: [/^.+\@exxon\..+$/, "Please fill a valid email address under exxon domain name"]
	},
  role: {
    type: String,
    enum: ["user", "admin"]
  },
  accepted: {
    type: Boolean,
    default: false
  },
	password: {
		type: String,
		required: 'Password is required',
		// Validate the 'password' value length
		validate: [
			(password) => password && password.length > 6,
			'Password should be longer'
		]
	},
	salt: {
		type: String
	},
	created: {
		type: Date,
		// Create a default 'created' value
		default: Date.now
	}
});

// Set the 'fullname' virtual property
UserSchema.virtual('fullName').get(function() {
	return this.firstName + ' ' + this.lastName;
});

// Use a pre-save middleware to hash the password
UserSchema.pre('save', function(next) {
	if (this.password) {
		this.salt = new Buffer(crypto.randomBytes(128).toString('base64'), 'base64');
		this.password = this.hashPassword(this.password);
	}
	next();
});

// Create an instance method for hashing a password
UserSchema.methods.hashPassword = function(password) {
	return crypto.pbkdf2Sync(password, this.salt, 10000, 64, 'sha384').toString('base64');
};

// Create an instance method for authenticating user
UserSchema.methods.authenticate = function(password) {
	return this.password === this.hashPassword(password);
};

UserSchema.statics.findOneSafely = function (query, done) {
  this.findOne(query,'-salt -password', done);
}

UserSchema.statics.findSafely = function(query, done) {
  this.find(query, '-salt -password', done);
}

UserSchema.statics.myTopScore = function(user, callback){
  this.findOne({quizTaker : user})
  .sort('-score')
  .exec(callback)
}

// Configure the 'UserSchema' to use getters and virtuals when transforming to JSON
UserSchema.set('toJSON', {
	getters: true,
	virtuals: true
});

// Create the 'User' model out of the 'UserSchema'
mongoose.model('User', UserSchema);
