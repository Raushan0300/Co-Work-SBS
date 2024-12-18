const Room = require('../models/roomModel');

const addRoomController = async(req, res)=>{
    const {roomName, roomType, roomAmentities, roomCapacity, roomPrice, roomAvailability, roomLocation} = req.body;
    console.log(req.body);
    if(!roomName || !roomType || !roomAmentities || !roomCapacity || !roomPrice || !roomLocation){
        return res.status(400).json({msg: "All fields are required"});
    }

    try {
        const isAdmin = req.user.role;
        if(isAdmin !== 'admin') return res.status(400).json({msg: "You are not authorized to add a room"});

        const newRoom = new Room({
            roomName, roomType, roomAmentities, roomCapacity, roomPrice, roomAvailability, roomLocation, addedBy: req.user._id
        });
        
        await newRoom.save();
        return res.status(200).json({msg: "Room added successfully"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({err: 'Server error occurred'});
    }
};

const getAdminRoomsController = async(req, res) => {
    try {
        const isAdmin = req.user.role;
        if(isAdmin !== 'admin') return res.status(400).json({err: "You are not authorized to view rooms"});

        const rooms = await Room.find({addedBy: req.user._id}).select('-addedBy -__v');
        return res.status(200).json(rooms);
    } catch (error) {
        console.log(error);
        return res.status(500).json({err: 'Server error occurred'});
    }
};

const getUserRoomsController = async(req, res) => {
    try {
        const rooms = await Room.find({roomAvailability: true}).select('-addedBy -__v');
        return res.status(200).json(rooms);
    } catch (error) {
        console.log(error);
        return res.status(500).json({err: 'Server error occurred'});
    }
};

const getRoomByIdController = async(req, res) => {
    try {
        const room = await Room.findById(req.query.id).select('-addedBy -__v');
        return res.status(200).json(room);
    } catch (error) {
        console.log(error);
        return res.status(500).json({err: 'Server error occurred'});
    }
};

const updateRoomController = async(req, res) => {
    const {roomName, roomType, roomAmentities, roomCapacity, roomPrice, roomAvailability, roomLocation} = req.body;
    if(!roomName || !roomType || !roomAmentities || !roomCapacity || !roomPrice || !roomLocation){
        return res.status(400).json({msg: "All fields are required"});
    }

    try {
        const isAdmin = req.user.role;
        if(isAdmin !== 'admin') return res.status(400).json({msg: "You are not authorized to update a room"});

        const room = await Room.findById(req.query.id);
        if(!room) return res.status(404).json({msg: "Room not found"});

        room.roomName = roomName;
        room.roomType = roomType;
        room.roomAmentities = roomAmentities;
        room.roomCapacity = roomCapacity;
        room.roomPrice = roomPrice;
        room.roomAvailability = roomAvailability;
        room.roomLocation = roomLocation;

        await room.save();
        return res.status(200).json({msg: "Room updated successfully"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({err: 'Server error occurred'});
    }
};

const deleteRoomController = async(req, res) => {
    try {
        const isAdmin = req.user.role;
        if(isAdmin !== 'admin') return res.status(400).json({msg: "You are not authorized to delete a room"});

        const room = await Room.findById(req.query.id);
        if(!room) return res.status(404).json({msg: "Room not found"});

        await room.deleteOne();
        return res.status(200).json({msg: "Room deleted successfully"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({err: 'Server error occurred'});
    }
}

module.exports = {addRoomController, getAdminRoomsController, getUserRoomsController, getRoomByIdController, updateRoomController, deleteRoomController};