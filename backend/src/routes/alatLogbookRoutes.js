const express = require('express');
const router = express.Router();
const controller = require('../controllers/alatLogbookController');

router.post('/alat', controller.createAlatLogbook);
router.get('/alat', controller.getAlatLogbooks);

module.exports = router;