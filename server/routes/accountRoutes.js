const config = require('../config/config');
const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');

router.get('/getDestinations', accountController.getDestinations);
router.get('/getDestinationsAndCoordinates', accountController.getDestinationsAndCoordinates);
router.get('/getTrips', accountController.getTrips);

router.post('/saveDestination', accountController.saveDestination);
router.post('/createTrip', accountController.createTrip);
router.post('/reorderDestinations', accountController.reorderDestinations);

module.exports = router;