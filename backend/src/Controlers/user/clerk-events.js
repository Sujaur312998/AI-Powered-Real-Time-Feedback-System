const USER = require('../../models/user_model');

exports.webhook = async (req, res) => {
    const user = req.body;

    try {
        switch (user.type) {
            case 'user.created':
                await handleUserCreated(user);
                break;
            case 'user.updated':
                await handleUserUpdated(user);
                break;
            case 'user.deleted':
                await handleUserDeleted(user);
                break;
            default:
                return res.status(400).json({ message: 'Unhandled user type' });
        }

        return res.status(200).json({ message: 'Event handled successfully' });
    } catch (error) {
        console.error('Error handling webhook:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Handler for user.created event
async function handleUserCreated(user) {
    // Check if user already exists
    let isUser = await USER.findOne({ id: user.data.id });
    if (!isUser) {
        // Create a new user in MongoDB
        const _user = new USER({
            id: user.data.id, // Clerk's unique user ID
            fullName: user.data.first_name + " " + user.data.last_name,
            email: user.data?.email_addresses[0]?.email_address, // Safely get the primary email
        });
        await _user.save();
    }
}
// Handler for user.updated event
async function handleUserUpdated(user) {
    // Find user by Clerk ID and update their details
    await USER.updateOne(
        { id: user.data.id },
        {$set:
            {
                id: user.data.id, // Clerk's unique user ID
                fullName: user.data.first_name + " " + user.data.last_name,
            }
        }
    );
}
// Handler for user.deleted event
async function handleUserDeleted(user) {
    // Remove the user from the database
    await USER.deleteOne({ id :user.data.id });
}