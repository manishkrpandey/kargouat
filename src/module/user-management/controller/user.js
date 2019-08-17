const User = require('../model/user');
const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const msg91 = require("msg91")("289978AQDC5Ra6Uou5d5838de", "ICICIF", "4");

exports.signup = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        const error = new Error('validation failed');
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }

    const name = req.body.name;
    const phone = req.body.phone;
    const alternatePhone = req.body.alternatePhone;
    const email = req.body.email;
    const pan = req.body.pan;
    const gender = req.body.gender;
    const password = req.body.password;
    const role = req.body.role;
    const isAdditionalDetailsAdded = req.body.isAdditionalDetailsAdded;
    const otp = req.body.otp;
    // if validation is pass
    bcrypt.hash(password, 12)
    .then(hashedPassword => {
        const user = new User({
            name: name,
            phone: phone,
            alternatePhone: alternatePhone,
            email: email,
            pan: pan,
            gender: gender,
            password: hashedPassword,
            role: role,
            isAdditionalDetailsAdded: isAdditionalDetailsAdded,
            otp: otp
        });
        return user.save();
    })
    .then(result => {
        res.status(201).json({message: 'Registration success!', userId: result._id});
    })
    .catch( err => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
};

// login
exports.login = (req, res, next) => {
    const phone = req.body.phone;
    const password = req.body.password;
    let loadedUser;
    User.findOne({phone: phone})
        .then(user => {
            if(!user) {
                const error = new Error('User with this phone could not be found.');
                error.statusCode = 401; // 401 user not authenticated
                throw error;
            }
            loadedUser = user;
            return bcrypt.compare(password, user.password); // return bcz it's give the promise
        })
        .then(isEqual => {
            if(!isEqual) {
                const error = new Error('wrong password!');
                error.statusCode = 401;
                throw error;
            }
            // if password is valid generate web token
            const token = jwt.sign({
                phone: loadedUser.phone,
                userId: loadedUser._id.toString()
            }, 'iamsecretcode', {expiresIn: '1h'}
            );
            res.status(200).json({token: token, userId: loadedUser._id.toString()});
        })
        .catch(err => {
            if(!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

// 
exports.generate_otp = (req, res, next) => {
    const phone = req.body.phone;
    User.findOne({phone})
        .then(user => {
            if(!user) {
                const error = new Error('User with this phone could not be found.');
                error.statusCode = 401; // 401 user not authenticated
                throw error;
            }
            const otpValue = Math.floor(1000 + Math.random() * 9000);
            // code to save the otp to db and send otp to user
            User.updateOne({phone}, {$set: {otp: otpValue}})
            .then(result => {
                // msg91.send(phone, otpValue, function (err, response) {
                //     if(response) {
                //         res.status(200).json({status:200 });
                //     } else if(err) {
                //         const error = new Error('Error with sending otp');
                //         error.statusCode = 401;
                //         throw error;
                //     }
                // });
                res.status(200).json({status:200 }); // delete this after uncommenting
            })
            .catch(err => {
                const error = new Error('Error with updating otp');
                error.statusCode = 401;
                throw error;
            })
        })
        .catch(err => {
            if(!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
    
};

// verify otp
exports.verify_otp = (req, res, next) => {
    const phone = req.body.phone;
    const otp = req.body.otp;
    User.findOne({phone})
        .then(user => {
        const loadedOTP = user.otp;
        const date_difference = new Date().getTime() - user.updatedAt.getTime();

        if(otp) {
            if(otp == loadedOTP && date_difference <= 300000) {
                res.status(200).json({status:200 });
            } else {
                const error = new Error('Invalid OTP');
                error.statusCode = 401; // 401 user not authenticated
                throw error;
            }
        }
    })
    .catch(err => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
};