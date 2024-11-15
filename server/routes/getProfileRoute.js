const express = require('express');
const authenticateController = require('../controllers/authenticateController');
const getProfileController = require('../controllers/getProfileController');

const router = express.Router();

router.get('/', authenticateController, getProfileController);

module.exports = router;