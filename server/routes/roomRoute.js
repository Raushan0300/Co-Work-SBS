const express = require('express');

const router = express.Router();

const authenticateController = require('../controllers/authenticateController');
const {addRoomController, getAdminRoomsController} = require('../controllers/roomController');

router.post('/admin/add-room', authenticateController, addRoomController);
router.get('/admin/get-rooms', authenticateController, getAdminRoomsController);

module.exports = router;