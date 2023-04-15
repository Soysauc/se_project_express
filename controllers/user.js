const User = require('../models/user');

const { handleError } = require('../utils/errors');

const getUsers = (req, res) => {
  User.find({})
    .then((data) => res.send({ data }))
    .catch((e) => {
      handleError(e, res);
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
  const { name, avatar } = req.body;

  User.create({ name, avatar })
    .then((user) => {
      res.send({ data: user });
    })
    .catch((e) => {
      handleError(e, res);
    });
};

module.exports = {
  getUsers,
  createUser,
  getUser,
};
