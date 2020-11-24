const mongoose = require('mongoose');
const cardSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = list = mongoose.model('card', cardSchema);
