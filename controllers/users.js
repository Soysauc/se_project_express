const bcrypt = require('bcryptjs');

const User = require('../models/user');

const JWT_SECRET = require('../utils/config');

const { handleError } = require('../utils/errors');

// const getUsers = (req, res) => {
//   User.find({})
//     .then((data) => res.send({ data }))
//     .catch((e) => {
//       handleError(e, res);
//     });
// };
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
        }).then((user) =>
          res.setHeader('Content-Type', 'application/json').status(201).send({
            name: user.name,
            avatar: user.avatar,
            email: user.email,
          })
        );
      });
    })
    .catch((err) => {
      handleError(err, res);
    });
};
module.exports = {
  getUsers,
  createUser,
  getUser,
  userLogin,
};
