const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    
    sourceDetais: {
        state: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        adress: {
            type: String,
            required: true
        }
    },
    destDetais: {
        state: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        adress: {
            type: String,
            required: true
        }
    },
    pickUpDate: {
        type: String,
        required: true
    },
    goodType: {
        type: String,
        required: true
    },
    loadingCapacity: {
        type: Number,
        required: true
    },
    isRequstApproved: {
        type: Boolean,
        default: false
    }

}, {
        timestamps: { createdAt: true, updatedAt: true }
});

module.exports = mongoose.model('Order', orderSchema);