const History = require('../models/historyModel');
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
        await newBooking.save();
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
}

module.exports = {newBookingController, getHistoryController, printHistoryController};