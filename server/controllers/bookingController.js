const History = require('../models/historyModel');
const Room = require('../models/roomModel');
const generateHtml = require('./printHistory');

const newBookingController = async(req, res)=>{
    const {bookedRoom, checkInDate, checkOutDate, totalAmount} = req.body;

    try {
        const user = req.user;
        if(!user) return res.status(404).json({msg: "User not found"});

        if(!bookedRoom || !checkInDate || !checkOutDate || !totalAmount) return res.status(400).json({msg: "All fields are required"});
        
        const newBooking = new History({
            bookedBy: user._id,
            bookedRoom,
            checkInDate,
            checkOutDate,
            totalAmount
        });
        const booked = await newBooking.save();
        if(!booked) return res.status(500).json({msg: "Booking failed"});
        const room = await Room.findByIdAndUpdate(bookedRoom, {$inc: {roomCapacity: -1}});
        if(!room) return res.status(404).json({msg: "Room not found"});
        return res.status(200).json({msg: "Booking successful"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({err: "Server Error Occured"});
    }
};

const getHistoryController = async(req, res)=>{
    const user = req.user;

    try {
        if(!user) return res.status(404).json({msg: "User not found"});
        const history = await History.find({bookedBy: user._id}).select('-__v -bookedBy').sort({bookedDate: -1}).populate('bookedRoom', 'roomName roomType roomPrice roomLocation');
        return res.status(200).json({history});
    } catch (error) {
        console.log(error);
        return res.status(500).json({err: "Server Error Occured"});
    }
};

const getAdminHistoryController = async(req, res)=>{
    const user = req.user;

    try {
        const history = await History.find().select('-__v').sort({bookedDate: -1}).populate('bookedRoom', 'addedBy roomName roomType roomPrice roomLocation');
        for(let i=0; i<history.length; i++){
            if(history[i].bookedRoom.addedBy !== user._id) history.splice(i, 1);
        };
        return res.status(200).json({history});
    } catch (error) {
        console.log(error);
        return res.status(500).json({err: "Server Error Occured"});
    }
}

const printHistoryController = async(req, res)=>{
    const {historyid} = req.headers;

    try {
        const history = await History.findById(historyid).select('-__v').populate('bookedRoom', 'roomName roomType roomPrice roomLocation');
        const html = generateHtml(history);
        return res.status(200).json(html);
    } catch (error) {
        console.log(error);
        return res.status(500).json({err: "Server Error Occured"});
    }
};

module.exports = {newBookingController, getHistoryController, printHistoryController, getAdminHistoryController};