const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Lab Logbook Routes
router.get('/logbook-lab', adminController.getAllLogbookLab);
router.get('/logbook-lab/:id', adminController.getLogbookLabById);
router.post('/logbook-lab', adminController.createLogbookLab);
router.put('/logbook-lab/:id/review', adminController.updateLabReview);

// Alat Logbook Routes
router.get('/logbook-alat', adminController.getAllLogbookAlat);
router.get('/logbook-alat/:id', adminController.getLogbookAlatById);
router.post('/logbook-alat', adminController.createLogbookAlat);
router.put('/logbook-alat/:id/review', adminController.updateAlatReview);

module.exports = router;