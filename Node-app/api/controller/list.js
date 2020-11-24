const listDB = require('../models/list');
// Add list
exports.addList = async (req, res) => {
  const result = await listDB({
    title: req.body.title,
  });
  await result.save();
  res
    .status(200)
    .json({ message: 'List Created Successfully', result: result });
};
//
exports.getAllList = async (req, res) => {
  try {
    const result = await listDB.find().populate('cardId');
    res.status(200).json({ message: 'OK', results: result });
  } catch (err) {
    console.log(err);
    res.status(500).json('Server Error');
  }
};
