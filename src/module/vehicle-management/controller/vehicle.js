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
        res.status(201).json({vehicleReponse: result} );
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
}

exports.getVehicle = (req, res, next) => {
  const mobile = Vehicle.ownerDetails.phone;
  Vehicle.aggregate([{$match: {phone: mobile}}])
  .then(result => {
    res.status(201).json({vehicleReponse: result} );
  })
  .catch(err => {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  });
}

exports.updateVehicle = (req, res, next) => {
    res.status(200).json({ message: 'Reached to vehicle controller===update'});
}
exports.deleteVehicle = (req, res, next) => {
    res.status(200).json({ message: 'Reached to vehicle controller===delete'});
}
