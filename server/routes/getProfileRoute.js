const express = require('express');
const authenticateController = require('../controllers/authenticateController');
const {getProfileController, updateProfileController} = require('../controllers/getProfileController');

const router = express.Router();

router.get('/', authenticateController, getProfileController);
router.put('/update', authenticateController, updateProfileController);

module.exports = router;