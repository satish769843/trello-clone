const express = require('express');
const router = express.Router();
const controller = require('../controller/card');
//
// Add Card
router.post('/add', controller.addCard);
// // Get all of a list's cards
router.get('/listCard/:listId', controller.listCard);
// Get a Card
router.get('/:id', controller.getCard);
// Edit Card
router.patch('/edit/:id', controller.editCard);
// Delete Card
router.delete('/delete/:listid/:id', controller.deleteCard);
router.patch('/move/:id', controller.moveCard);

module.exports = router;
