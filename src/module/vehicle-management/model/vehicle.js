const mongoose = require('mongoose');
const Schema = mongoose.Schema;

vehicleSchema = new Schema({
   assignedDriverRef:{
    driverPhone: {
        type:Number,
        required: false
    },
    isDriverAssigned : {
        type:Boolean,
         default: false
    }
   } ,
    vehileDetails: {
        vehicleNumber: {
            type: String,
            required: true
        },
        chassisNumber: {
            type: String,
            required: true
        },
        currentState: {
            type: String,
            required: true
        },
        permitState: {
            type: Array,
            required: true
        },
        rcNumber: {
            type: String,
            require: true
        },
        loadCapacity: {
            type: Number,
            required: true
        },
        insuranceId: {
            type: String,
            required: false
        },
        serviceStatus: {
            type: Boolean,
            default: true
        },
        vehicleType: {
            type: String,
            required: true
        },
        vehicleAvaibility: {
            type: String,  //  Running/booked/available/not/available
            required: true
        }
    },
    ownerDetails: {
        name: {
            type: String,
            required: true
        },
        phone: {
            type: Number,
            required: true
        },
        address: {
            type: Object,
            required: true
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

module.exports = mongoose.model('Vehicle', vehicleSchema); 