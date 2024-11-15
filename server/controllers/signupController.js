const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/userModel');

const signupController = async(req, res, next)=>{
    const {name, email, password, role} = req.body;

    try {
        const userExists = await User.findOne({email});
        if(userExists) return res.status(400).json({err: 'User already exists with this email'});

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role
        });

        await newUser.save();

        const payload = {
            user: {
                id: newUser._id
            }
        };

        jwt.sign(payload, process.env.JWT_SECRET, (err, token)=>{
            if(err) throw err;
            req.token = token;
            next();
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({err: 'Server error occurred'});
    }
};

module.exports = signupController;