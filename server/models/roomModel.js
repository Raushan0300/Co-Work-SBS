const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
    roomName: {
        type: String,
        required: true
    },
    roomType: {
        type: String,
        required: true
    },
    roomCapacity: {
        type: Number,
        required: true
    },
    roomAmentities: {
        type: Array,
        required: true
    },
    roomAvailability: {
        type: Boolean,
        required: true
    },
    roomPrice: {
        type: Number,
        required: true
    },
    roomLocation: {
        type: String,
        required: true
    },
    addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

const Room = mongoose.model('Room', RoomSchema);
module.exports = Room;