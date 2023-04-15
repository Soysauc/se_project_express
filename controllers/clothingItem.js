const ClothingItem = require('../models/clothingItem');

const createItem = (req, res) => {
  const userId = req.user._id;
  const { name, weather, imageURL } = req.body;

  ClothingItem.create({ name, weather, imageUrl: imageURL, owner: userId })
    .then((item) => {
      res.send({ data: item });
    })
    .catch((e) => {
      res.status(500).send({ message: 'error from CreateItem', e });
    });
};
const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.status(200).send(items))
    .catch((e) => res.status(500).send({ message: 'error from getItems', e }));
};

const updateItem = (req, res) => {
  const { itemId } = req.params;
  const { imageURL } = req.body;

  ClothingItem.findByIdAndUpdate(
    itemId,
    { $set: { imageUrl: imageURL } },
    {
      returnOriginal: false,
    }
  )
    .orFail()
    .then((item) => res.status(200).send({ data: item }))
    .catch((e) =>
      res.status(500).send({ message: 'error from updateItem', e })
    );
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;

  ClothingItem.findByIdAndDelete(itemId)
    .orFail()
    .then((item) => res.status(204).send({ item }))
    .catch((e) =>
      res.status(500).send({ message: 'error from deleteItem', e })
    );
};

const likeItem = (req, res) =>
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => res.status(204).send({ item }))
    .catch((e) => res.status(500).send({ message: 'error from likeItem', e }));

const dislikeItem = (req, res) =>
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => res.status(204).send({ item }))
    .catch((e) =>
      res.status(500).send({ message: 'error from dislikeItem', e })
    );

module.exports = {
  createItem,
  getItems,
  updateItem,
  deleteItem,
  likeItem,
  dislikeItem,
};
