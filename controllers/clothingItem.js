const ClothingItem = require('../models/clothingItem');
const { handleError } = require('../utils/errors');

const createItem = (req, res) => {
  const userId = req.user._id;

  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({ name, weather, imageURL: imageUrl, owner: userId })
    .then((item) => {
      res.status(201).send({ data: item });
    })
    .catch((e) => {
      handleError(e, req, res);
    });
};
const getItems = (req, res) => {
  ClothingItem.find({})
    .then((data) => {
      res.send({ data });
    })
    .catch((e) => {
      handleError(e, req, res);
    });
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;
  ClothingItem.findById(itemId)
    .orFail()
    .then((item) => {
      if (item.owner.equals(req.user._id)) {
        return item.deleteOne().then(() => res.send({ clothingItem: item }));
      }
      return res.status(403).send({
        message: 'Forbidden',
      });
    })
    .catch((err) => {
      handleError(err, req, res);
    });
};

const likeItem = (req, res) =>
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => res.send({ data: item }))
    .catch((e) => {
      handleError(e, req, res);
    });
const dislikeItem = (req, res) =>
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => res.send({ data: item }))
    .catch((e) => {
      handleError(e, req, res);
    });

const updateItem = (req, res) => {
  const { itemId } = req.params;
  const { imageURL } = req.body;

  ClothingItem.findByIdAndUpdate(itemId, {
    $set: { imageURL },
    new: true,
    runValidators: true,
  })
    .orFail()
    .then((item) => res.send({ data: item }))
    .catch((e) => {
      handleError(e, req, res);
    });
};

module.exports = {
  createItem,
  getItems,
  updateItem,
  deleteItem,
  likeItem,
  dislikeItem,
};
