const USER = require('../../models/user_model');

exports.getuser = async (req, res) => {
    try {
        // Destructure 'id' from request body
        const { id } = req.query;

        // Find the user by 'id'
        const _user = await USER.findOne({ id },'role');

        // Check if the user is found
        if (!_user) {
            return res.status(404).json({ message: "User not found" });
        }

        // If user is found, return user data
        res.status(200).json(_user);
    } catch (error) {
        // Handle any errors during the process
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};
