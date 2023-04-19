const router = require('express').Router();

const auth = require('../middlewares/auth');

const { updateUser, getUser } = require('../controllers/users');

router.get('/me', auth, getUser);

router.patch('/me', auth, updateUser);

module.exports = router;
