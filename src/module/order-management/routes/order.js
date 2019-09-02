const express = require('express');
const { body } = require('express-validator');


const serviceRequestModel = require('../model/order');
const requestController = require('../controller/order');

const router = express.Router();

router.post('/', requestController.addServiceRequestController);

router.get('/getstates', requestController.getStates);

module.exports = router;