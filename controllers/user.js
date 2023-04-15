const User = require('../models/user');

const { handleError } = require('../utils/errors');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((e) => {
      handleError(e, req, res);
    });
};

const getUser = (req, res) => {
  const { userId } = req.user._id;

  User.findById(userId)
    .then((item) => res.status(200).send({ data: item }))
    .catch((e) => {
      res.send({ message: e.message });
      handleError(e, req, res);
    });
};

const createUser = (req, res) => {
  const { name, avatar } = req.body;

  User.create({ name, avatar })
    .then((user) => {
      res.send({ data: user });
    })
    .catch((e) => {
      handleError(e, req, res);
    });
};

module.exports = {
  getUsers,
  createUser,
  getUser,
};
