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

const updateProfileController = async(req, res) => {
    try {
        const {name} = req.body;
        const user = req.user;
        if(!user) return res.status(404).json({err: 'User not found'});

        user.name = name;
        await user.save();
        return res.status(200).json({msg: 'Profile updated successfully'});
    } catch (error) {
        console.log(error);
        return res.status(500).json({err: 'Server error occurred'});
    }
}

module.exports = {getProfileController, updateProfileController};