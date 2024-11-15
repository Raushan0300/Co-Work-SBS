const express = require('express');

const router = express.Router();

const signupController = require('../controllers/signupController');

router.post('/signup', signupController, (req, res)=>{
    try {
        const token = req.token;
        if(!token) return res.status(400).json({err: 'Something Went Wrong! Please try again'});

        return res.status(200).json({token});
    } catch (error) {
        console.log(error);
        return res.status(500).json({err: 'Server error occurred'});
    };
});

router.post('/admin/signup', signupController, (req, res)=>{
    try {
        const token = req.token;
        if(!token) return res.status(400).json({err: 'Something Went Wrong! Please try again'});

        return res.status(200).json({token});
    } catch (error) {
        console.log(error);
        return res.status(500).json({err: 'Server error occurred'});
    };
})

module.exports = router;