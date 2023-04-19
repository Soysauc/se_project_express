const router = require('express').Router();

const auth = require('../middlewares/auth');

const {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  dislikeItem,
} = require('../controllers/clothingItem');

router.post('/', auth, createItem);

router.get('/', auth, getItems);

router.put('/:itemId/likes', auth, likeItem);

router.delete('/:itemId/likes', auth, dislikeItem);

router.delete('/:itemId', auth, deleteItem);

module.exports = router;
