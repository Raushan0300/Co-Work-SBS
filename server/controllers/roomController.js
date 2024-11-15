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

        const rooms = await Room.find({addedBy: req.user._id}).select('-addedBy -__v -_id');
        return res.status(200).json(rooms);
    } catch (error) {
        console.log(error);
        return res.status(500).json({err: 'Server error occurred'});
    }
}

module.exports = {addRoomController, getAdminRoomsController};