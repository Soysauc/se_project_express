const router = require('express').Router();
const auth = require('../middlewares/auth');

const user = require('./users');

const clothingItem = require('./clothingItems');

const { ERROR_CODES } = require('../utils/errors');

router.use('/items', clothingItem);

router.use('/users', auth, user);

router.use((req, res) => {
  res
    .status(ERROR_CODES.NotFound)
    .send({ message: 'Requested resource not found' });
});

module.exports = router;
