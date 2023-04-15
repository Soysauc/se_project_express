const User = require('../models/user');

const { handleError } = require('../utils/errors');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => {
      handleError(err, req, res);
    });
};

const getUser = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .then((item) => res.status(200).send({ data: item }))
    .catch((err) => {
      res.send({ message: err.message });
      handleError(err, req, res);
    });
};

const createUser = (req, res) => {
  const { name, avatar } = req.body;

  User.create({ name, avatar })
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      handleError(err, req, res);
    });
};

module.exports = {
  getUsers,
  createUser,
  getUser,
};
