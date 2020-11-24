const mongoose = require('mongoose');

const list = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    cardId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'card',
      },
    ],
  },
  { timestamps: true }
);

module.exports = listDB = mongoose.model('list', list);
