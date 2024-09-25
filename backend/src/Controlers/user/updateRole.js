const USER = require('../../models/user_model');

exports.updateRole = async (req, res) => {
    try {
        const { id, role } = req.body;

        const updatedUser = await USER.findOneAndUpdate(
            {id},
            { role: role },
            { new: true } // Returns the updated document
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ 
            message: "User role updated successfully", 
            updatedUser 
        });
    } catch (error) {
        console.error('Error in updateRole:', error);  // Log the error to check what went wrong
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
