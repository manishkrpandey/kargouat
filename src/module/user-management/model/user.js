const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    alternatePhone: {
        type: Number,
        required: false
    },
    email: {
        type: String,
        required: true
    },
    pan: {
        type: String,
        required: true
    }, 
    gender: {
        type: String,
        required: true
    }, 
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user'
    }, 
    isAdditionalDetailsAdded: {
      type: Boolean,
      default: false
    },
    otp: {
        type: Number
    },
    isPhoneVerified: Boolean,
    default: false
},
{
  timestamps: { createdAt: true, updatedAt: true }
})

// userSchema.set('timestamps', true);
module.exports = mongoose.model('User', userSchema); // store in user collection