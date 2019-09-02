const { validationResult } = require('express-validator');
const Driver = require('../model/driver');

exports.addDriver = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('validation failed');
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }
    const driver = new Driver(req.body);
    driver.save()
    .then(result => {
      res.status(201).json({ driverReponse: result });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
}


exports.updateDriver = (req, res, next) => {
  const dlNumber = req.body.dlNumber;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('validation failed');
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
  Driver.find({ "dlNumber": dlNumber})
    .then(result => {
      if (!result && result.length) {
        const error = new Error('could not found the driver');
        error.statusCode = 404;
        throw error;
      }
      const driver = new Driver(req.body);
      return driver.save();
    })
    .then(result => {
      res.status(200).json({ message: 'Driver updated!', status: 200, driver: result });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    })
}

exports.getDriver = (req, res, next) => {
  const dlNumber = req.body.dlNumber;
  Driver.find({ 'dlNumber': dlNumber })
    .then(result => {
      if (result.length && result) {
        res.status(200).json({ result: result });
      } else {
        const error = new Error('Driver not found');
        error.statusCode = 404;
        throw error;
      }
    }).catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    })
}