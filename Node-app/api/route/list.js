const express = require('express');
const router = express.Router();
const controller = require('../controller/list');
//

// Add List
router.post('/add', controller.addList);
router.get('/', controller.getAllList);

module.exports = router;
