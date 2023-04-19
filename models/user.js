const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    default: 'Elise Bouer',
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    default:
      'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Elise.png',
    validate: {
      validator: (value) => validator.isURL(value),
      message: 'Must be a valid URL',
    },
  },
  email: {
    required: [true, 'Must be a valid email'],
    type: String,
    validate: { validator: (value) => validator.isEmail(value) },
    message: 'Must be a valid email',
  },
  password: {
    required: [true, 'Please enter your password'],
    type: String,
    minlength: [8, 'Password must be 8 characters or more'],
    select: false,
  },
});
//step 9
userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password
) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Incorrect email or password'));
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(new Error('Incorrect email or password'));
        }
        return user;
      });
    });
};

module.exports = mongoose.model('users', userSchema);
