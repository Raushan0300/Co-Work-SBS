const express = require('express');

const router = express.Router();

const authenticateController = require('../controllers/authenticateController');
const {addRoomController, getAdminRoomsController, getUserRoomsController, getRoomByIdController, updateRoomController, deleteRoomController} = require('../controllers/roomController');

router.post('/admin/add-room', authenticateController, addRoomController);
router.get('/admin/get-rooms', authenticateController, getAdminRoomsController);
router.get('/get-rooms', authenticateController, getUserRoomsController);
router.get('/get-room', authenticateController, getRoomByIdController);
router.post('/admin/update-room', authenticateController, updateRoomController);
router.post('/admin/delete-room', authenticateController, deleteRoomController);

module.exports = router;