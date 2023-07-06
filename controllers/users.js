const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { JWT_SECRET } = require('../utils/config');
const { handleError } = require('../utils/errors');

const updateUser = (req, res) => {
  const { name, avatar, token } = req.body;

  User.findByIdAndUpdate(
    { _id: req.user._id },
    { name, avatar, token },
    { new: true, runValidators: true }
  )
    .then((user) => res.send({ user }))
    .catch((err) => {
      handleError(err, req, res);
    });
};

const userLogin = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: '7d',
      });
      res.send({ token });
    })
    .catch((err) => {
      handleError(err, req, res);
    });
};

// const getUser = (req, res) => {
//   const userId = req.user._id;

//   User.findById(userId)
//     .orFail()
//     .then((item) => res.send({ data: item }))
//     .catch((e) => {
//       handleError(e, req, res);
//     });
// };
const getCurrentUser = (req, res) => {
  User.findById(req.user._id)
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      handleError(err, req, res);
    });
};

const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;
  console.log(req.body);
  User.findOne({ email })
    .then((user) => {
      if (user) {
        const error = new Error('Email already used');
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
          .then((data) =>
            res.setHeader('Content-Type', 'application/json').send({
              name: data.name,
              avatar: data.avatar,
              email: data.email,
            })
          )
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
  getCurrentUser,
  userLogin,
  updateUser,
};
