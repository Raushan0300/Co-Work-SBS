const express = require('express');
const router = express.Router();

const authenticateController = require('../controllers/authenticateController');
const { getHistoryController, newBookingController, printHistoryController, getAdminHistoryController } = require('../controllers/bookingController');

router.get('/history', authenticateController, getHistoryController);
router.post('/book', authenticateController, newBookingController);
router.get('/print', authenticateController, printHistoryController);
router.get('/admin/history', authenticateController, getAdminHistoryController);

module.exports = router;