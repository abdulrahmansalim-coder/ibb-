const express = require('express');
const router = express.Router();
const logbookController = require('../controllers/logbookController');

router.post('/lab', logbookController.createLabLogbook);
router.get('/lab', logbookController.getLabLogbooks);

module.exports = router;