const { validationResult } = require('express-validator');

const Vehicle = require('../model/vehicle');

exports.addVehicle = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('validation failed');
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
  const vehicle = new Vehicle(req.body);
  vehicle.save()
    .then(result => {
      res.status(201).json({ vehicleReponse: result });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
}

exports.getVehicle = (req, res, next) => {
  const phone = req.body.phone;
  Vehicle.find({ 'ownerDetails.phone': phone })
    .then(result => {
      if (result.length && result) {
        res.status(200).json({ result: result });
      } else {
        const error = new Error('Vehicle not found');
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

exports.updateVehicle = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('validation failed');
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }

  Vehicle.find({ "vehileDetails.vehicleNumber": req.body.vehileDetails.vehicleNumber })
    .then(result => {
      if (!result && result.length) {
        const error = new Error('could not find the _id');
        error.statusCode = 404;
        throw error;
      }
      const vehicle = new Vehicle(req.body);
      return vehicle.save();
    })
    .then(result => {
      res.status(200).json({ message: 'Vehicle updated!', status: 200, vehicle: result });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    })
}

