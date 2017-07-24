const config = require('../config/config');
const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');

router.post('/saveDestination', accountController.saveDestination)

module.exports = router;