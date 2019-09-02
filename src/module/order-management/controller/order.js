const { validationResult } = require('express-validator');
let csc = require('country-state-city');
const stateCityList = require('../../json/stateCityList.json');


const ServiceRequestModel = require('../model/order');

exports.addServiceRequestController = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('validation failed');
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }
    const requestData = new ServiceRequestModel(req.body);
    requestData.save()
      .then(result => {
        res.status(201).json({ responseData: result, status: 201 });
      })
      .catch(err => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
  }

  // get state list
  exports.getStates = (req, res, next) => {
    const stateList = Object.keys(stateCityList);
    if(stateList.length) {
      res.status(200).json({status: 200, message: "state list fetched successfully", states: stateList});
    } else {
      
    }
  }