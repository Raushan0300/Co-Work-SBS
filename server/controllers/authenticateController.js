const jwt = require('jsonwebtoken');

const User = require('../models/userModel');

const authenticateController = async(req, res, next)=>{
    const token = req.headers['authorization'];
    if(!token) return res.status(401).json({err: 'No token, authorization denied'});

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded) return res.status(401).json({err: 'Token is not valid'});

        const user = await User.findById(decoded.user.id).select('-password -_id -__v');
        if(!user) return res.status(404).json({err: 'User not found'});

        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({err: 'Server error occurred'});
    }
};

module.exports = authenticateController;