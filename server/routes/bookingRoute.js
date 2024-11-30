const express = require('express');
const router = express.Router();

const authenticateController = require('../controllers/authenticateController');
const { getHistoryController, newBookingController, printHistoryController } = require('../controllers/bookingController');

router.get('/history', authenticateController, getHistoryController);
router.post('/book', authenticateController, newBookingController);
router.get('/print', authenticateController, printHistoryController);

module.exports = router;