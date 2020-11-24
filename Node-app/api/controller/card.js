const CardDB = require('../models/card');
const ListDB = require('../models/list');
// add card
exports.addCard = async (req, res) => {
  const { title, listId } = req.body;
  const newcard = await new CardDB({
    title,
  });
  const card = await newcard.save();
  const list = await ListDB.findById(listId);
  list.cardId.push(card.id);
  await list.save();
  res.status(201).json({
    message: 'Card Created Successfully',
    cardId: card.id,
    listId,
  });
};

// Get all list Card
exports.listCard = async (req, res) => {
  try {
    const listId = req.params.listId;
    const list = await ListDB.findById(listId);
    console.log('list', list);
    if (!list) {
      res.status(404).json({ message: 'List Not Found' });
    }
    const cards = [];
    for (const cardId of list.cardId) {
      cards.push(await ListDB.find({ cardId: cardId }));
    }
    res.status(200).json({ message: 'Get All List', results: cards });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

// get A Card
exports.getCard = async (req, res) => {
  try {
    const id = req.params.id;
    const card = await CardDB.findById(id);
    if (!card) {
      return res.status(404).json({ msg: 'Card not found' });
    }
    res.status(200).json({ message: 'Get a Card Successfully', results: card });
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
};

// Move Card
exports.moveCard = async (req, res) => {
  try {
    const { fromId, toId, toIndex } = req.body;
    const cardId = req.params.id;
    let from = await ListDB.findById(fromId);
    console.log('from', from);
    let to = await ListDB.findById(toId);
    console.log('to', to);
    if (!cardId || !from || !to) {
      return res.status(404).json({ msg: 'List/card not found' });
    } else if (fromId === toId) {
      to = from;
    }
    const fromIndex = from.cardId.indexOf(cardId);
    if (fromIndex !== -1) {
      from.cardId.splice(fromIndex, 1);
      await from.save();
    }

    if (!to.cardId.includes(cardId)) {
      if (toIndex === 0 || toIndex) {
        to.cardId.splice(toIndex, 0, cardId);
      } else {
        to.cardId.push(cardId);
      }
      await to.save();
    }
    return res
      .status(200)
      .json({ message: 'Move Successfully', cardId, from, to });
  } catch (err) {
    console.log(err);
    res.status(500).json('Server Error');
  }
};

// Edit Card
exports.editCard = async (req, res) => {
  const id = req.params.id;
  const updateCard = {};
  if (req.body.title) updateCard.title = req.body.title;
  try {
    const results = await CardDB.findByIdAndUpdate(
      id,
      { $set: updateCard },
      { new: true }
    );
    res
      .status(201)
      .json({ message: 'Edit Card SuccessFully', results: results });
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
};

// Card Delete
exports.deleteCard = async (req, res) => {
  try {
    const id = req.params.id;
    const card = await CardDB.findByIdAndDelete(id);
    const list = await ListDB.findById(req.params.listid);
    if (!card || !list) {
      return res.status(404).json({ msg: 'List/card not found' });
    }
    list.cardId.splice(list.cardId.indexOf(id), 1);
    await list.save();
    res.status(202).json({ message: 'Card Delete Successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
};
