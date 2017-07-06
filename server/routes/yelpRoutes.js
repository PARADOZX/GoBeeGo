const config = require('../config/config');
const express = require('express');
const router = express.Router();
const yelpController = require('../controllers/yelpController');

router.get('/testAPI', yelpController.testAPI)

router.get('/autocomplete', yelpController.autocompleteGen);


module.exports = router;