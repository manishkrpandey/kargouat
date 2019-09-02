var mongoose = require('mongoose');
var Schema = mongoose.Schema;

driverSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    dob: {
        type: String,
        required: true
    },
    dlNumber: {
        type: String,
        required: true
    },
    insuranceDetails: {
        insuranceId: {
            type: String,
            required: true
        },
        validFrom: {
            type: String,
            require: true
        },
        validTo: {
            type: String,
            required: true,
        }
    },
    bankDetails: {
        accountNumber: {
            type: Number,
            required: true
        },
        ifscCode: {
            type: String,
            required: true
        }
    }

},
    {
        timestamps: { createdAt: true, updatedAt: true }
    });

    module.exports = mongoose.model('Driver', driverSchema);