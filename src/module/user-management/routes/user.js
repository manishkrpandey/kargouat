const express = require('express');
const {body} = require('express-validator');
const User = require('../model/user');
const userController = require('../controller/user')

const router = express.Router();

router.post('/signup', [
    body('phone')
    .isMobilePhone('en-IN')
    .withMessage('Please Enter valid phone number.')
    .custom((value, {req }) => {
      return User.findOne({phone: value}).then(userData => {
          if(userData) {
              return Promise.reject('User already exits!');
          }
      })
    }),
    body('name').isLength({min: 2, max:40}),
    body('email').isEmail(),
    body('pan').trim().isLength({min: 10, max:10}),
    body('gender').trim().not().isEmpty(),
    body('password').trim().isLength({min: 4, max: 20})

], userController.signup);

router.post('/login', userController.login);

router.post('/generate_otp', userController.generate_otp);
router.post('/verify_otp', userController.verify_otp);

module.exports = router;
