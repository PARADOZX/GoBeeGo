const config = require('../config/config');
const express = require('express');
const router = express.Router();
const yelpController = require('../controllers/yelpController');

router.get('/testAPI', yelpController.testAPI)

router.get('/autocomplete', yelpController.autocompleteGen);

router.get('/searchByKeyword', yelpController.searchByKeyword);

router.get('/businessDetails', yelpController.businessDetails);

router.get('/businessReviews', yelpController.businessReviews);

module.exports = router;