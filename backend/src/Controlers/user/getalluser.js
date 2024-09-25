const USER = require('../../models/user_model');

exports.getAllUsers = async (req, res) => {
    try {
        // Fetch all users from the database
        const users = await USER.find();

        // If no users are found, return a 404 response
        if (!users || users.length === 0) {
            return res.status(404).json({ 
                status: "fail", 
                message: "No users found" 
            });
        }

        // Return the list of users with a 200 status
        res.status(200).json({
            status: "success",
            data: users
        });
    } catch (error) {
        // Log the error and return a 500 status with a more descriptive message
        console.error("Error fetching users:", error.message);
        res.status(500).json({ 
            status: "error", 
            message: "Internal Server Error - could not retrieve users" 
        });
    }
};
