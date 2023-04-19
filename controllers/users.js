const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const JWT_SECRET = require('../utils/config');
const { handleError } = require('../utils/errors');

// UPDATE
const updateUser = (req, res) => {
  const { name, avatar, userId } = req.params;

  User.findByIdAndUpdate(
    { userId },
    { name, avatar },
    { new: true, runValidators: true }
  )
    .then((user) => res.status(200).send({ user }))
    .catch((err) => {
      handleError(err, res);
    });
};

const userLogin = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: '7d',
      });
      return token;
    })
    .catch((err) => {
      res
        .status(401)
        .send({ message: 'There is a  problem with your login', err });
    });
};

const getUser = (req, res) => {
  const { userId } = req.user._id;

  User.findById(userId)
    .orFail()
    .then((item) => res.status(200).send({ data: item }))
    .catch((e) => {
      handleError(e, res);
    });
};

const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;

  return User.findOne({ email })
    .then((user) => {
      if (user) {
        const error = new Error('This email has been used');
        error.statusCode = 409;
        throw error;
      }
      return bcrypt.hash(password, 10).then((hash) => {
        User.create({
          name,
          avatar,
          email,
          password: hash,
        })
          .then(() => res.send({ name, avatar, email }))
          .catch((err) => {
            handleError(err, req, res);
          });
      });
    })
    .catch((err) => {
      handleError(err, req, res);
    });
};
module.exports = {
  createUser,
  getUser,
  userLogin,
  updateUser,
};
