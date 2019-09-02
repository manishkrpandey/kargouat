const express = require('express');
const { body } = require('express-validator');

const Driver = require('../model/driver');
const driverController = require('../controller/driver');

const router = express.Router();

router.post('/', [

    body('dlNumber')
        .not().isEmpty()
        .withMessage('please Enter a valid DL Number')
        .custom((value, { req }) => {
            return Driver.find({ 'dlNumber': value }).then(driverData => {
                if (driverData.length) {
                    return Promise.reject('Driver already exits!');
                }
            })
        }),
    body('phone').isMobilePhone('en-IN'),
    body('gender').trim().not().isEmpty(),
    body('dob').trim().not().isEmpty(),

    body('insuranceDetails[insuranceId]').trim().not().isEmpty(),
    body('insuranceDetails[validFrom]').trim().not().isEmpty(),
    body('insuranceDetails[validTo]').trim().not().isEmpty(),

    body('bankDetails[accountNumber]').isNumeric().trim().escape(),
    body('bankDetails[ifscCode]').isAlphanumeric().trim().escape()

] , driverController.addDriver);

router.put('/', [
    body('dlNumber').trim().not().isEmpty(),
    body('phone').isMobilePhone('en-IN'),
    body('gender').trim().not().isEmpty(),
    body('dob').trim().not().isEmpty(),

    body('insuranceDetails[insuranceId]').trim().not().isEmpty(),
    body('insuranceDetails[validFrom]').trim().not().isEmpty(),
    body('insuranceDetails[validTo]').trim().not().isEmpty(),

    body('bankDetails[accountNumber]').isNumeric().trim().escape(),
    body('bankDetails[ifscCode]').isAlphanumeric().trim().escape()
], driverController.updateDriver);

 router.get('/', driverController.getDriver);

module.exports = router;

