const express = require('express');
const { body } = require('express-validator');

const Vehicle = require('../model/vehicle');
const vehicleController = require('../controller/vehicle');

const router = express.Router();

router.post('/', [
    body('vehileDetails[vehicleNumber]')
        .not().isEmpty()
        .withMessage('Please Enter Valid Vehicle number')
        .custom((value, { req }) => {
            return Vehicle.find({ 'vehileDetails.vehicleNumber': req.body.vehileDetails.vehicleNumber }).then(vehicleData => {
                if (vehicleData.length) {
                    return Promise.reject('vehileDetails Vehicle already exits!');
                }
            })
        }),
      body('vehileDetails[chassisNumber]').trim().not().isEmpty(),
      body('vehileDetails[currentState]').trim().not().isEmpty(),
      body('vehileDetails[permitState]').isArray().not().isEmpty(),
      body('vehileDetails[rcNumber]').trim().not().isEmpty(),
      body('vehileDetails[loadCapacity]').trim().not().isEmail(),
      body('vehileDetails[serviceStatus]').trim().not().isEmpty(),
      body('vehileDetails[vehicleType]').trim().not().isEmpty(),
      body('vehileDetails[vehicleAvaibility]').trim().not().isEmpty(),

      body('ownerDetails[name]').isLength({min:2, max: 40}),
      body('ownerDetails[phone]').isLength({min: 10, max:10}),
      body('ownerDetails[address]').trim().not().isEmpty(),

      body('bankDetails[accountNumber]').trim().not().isEmpty(),
      body('bankDetails[ifscCode]').trim().not().isEmpty()


], vehicleController.addVehicle);

router.get('/', vehicleController.getVehicle);

router.put('/', [
    body('vehileDetails[vehicleNumber]').trim().not().isEmpty(),
    body('vehileDetails[chassisNumber]').trim().not().isEmpty(),
      body('vehileDetails[currentState]').trim().not().isEmpty(),
      body('vehileDetails[permitState]').isArray().not().isEmpty(),
      body('vehileDetails[rcNumber]').trim().not().isEmpty(),
      body('vehileDetails[loadCapacity]').trim().not().isEmail(),
      body('vehileDetails[serviceStatus]').trim().not().isEmpty(),
      body('vehileDetails[vehicleType]').trim().not().isEmpty(),
      body('vehileDetails[vehicleAvaibility]').trim().not().isEmpty(),

      body('ownerDetails[name]').isLength({min:2, max: 40}),
      body('ownerDetails[phone]').isLength({min: 10, max:10}),
      body('ownerDetails[address]').trim().not().isEmpty(),

      body('bankDetails[accountNumber]').trim().not().isEmpty(),
      body('bankDetails[ifscCode]').trim().not().isEmpty()

] , vehicleController.updateVehicle);



module.exports = router;