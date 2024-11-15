
const getProfileController = async(req, res) => {
    try {
        const user = req.user;
        if(!user) return res.status(404).json({err: 'User not found'});

        return res.status(200).json({user});
    } catch (error) {
        console.log(error);
        return res.status(500).json({err: 'Server error occurred'});
    }
};

module.exports = getProfileController;