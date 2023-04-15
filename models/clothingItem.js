const mongoose = require('mongoose');

const validator = require('validator');

const clothingItem = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  weather: {
    type: String,
    required: true,
    enum: ['hot', 'warm', 'cold'],
  },
  imageURL: {
    type: String,
    required: true,
    validate: {
      validator: (value) => validator.isURL(value),
      message: 'Must be a valid URL',
    },
  },
  owner: {
    type: String,
    required: true,
  },
  likes: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model('clothingItems', clothingItem);
