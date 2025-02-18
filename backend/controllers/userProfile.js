// const dotenv = require('dotenv');
const User = require("../models/user");
// dotenv.config(); 


const userProfile = async (req, res) => {
    const userId = req.user.id;

    try {
        const user = await User.findById(userId).select('email username mobileNo referralCode');

        if (!user) return res.status(404).json({ message: 'User not found' });

        // Manually add the role before sending the response
        const userWithRole = {
            ...user.toObject(), // Convert Mongoose document to plain object
            role: userId === "67a7066e1d372077657ab830" ? "admin" : "user" // Assign role dynamically
        };

        res.json(userWithRole);
    } catch (error) {
        res.status(500).json({ message: 'Server error while fetching profile.' });
    }
};





module.exports = { userProfile };
