const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { JWT_SECRET } = require('../utils/config');
const { handleError } = require('../utils/errors');

const updateUser = (req, res) => {
  const { name, avatar } = req.body;

  User.findByIdAndUpdate(
    { _id: req.user._id },
    { name, avatar },
    { new: true, runValidators: true }
  )
    .then((user) => res.send({ user }))
    .catch((e) => {
      handleError(e, req, res);
    });
};

const userLogin = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: '7d',
      });
      return res.send({ token });
    })
    .catch(() => {
      res.status(401).send({ message: 'There is a  problem with your login' });
    });
};

const getUser = (req, res) => {
  const userId = req.user._id;

  User.findById(userId)
    .orFail()
    .then((item) => res.send({ data: item }))
    .catch((e) => {
      handleError(e, req, res);
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
          .catch((e) => {
            handleError(e, req, res);
          });
      });
    })
    .catch((e) => {
      handleError(e, req, res);
    });
};
module.exports = {
  createUser,
  getUser,
  userLogin,
  updateUser,
};
