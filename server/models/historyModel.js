const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
    bookedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    bookedRoom: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room'
    },
    bookedDate: {
        type: Date,
        default: Date.now
    },
    checkInDate: {
        type: Date,
        required: true
    },
    checkOutDate: {
        type: Date,
        required: true
    },
    totalAmount: {
        type: Number,
        required: true
    },
    isPaid: {
        type: Boolean,
        default: false
    }
});

const History = mongoose.model('History', historySchema);
module.exports = History;