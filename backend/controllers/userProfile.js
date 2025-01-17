const dotenv = require('dotenv');
const User = require("../models/user"); 
// dotenv.config(); 


const userProfile = async (req, res) => {
    const userId = req.id; 

    try {
        const user = await User.findById(userId).select('email username mobileNo referralCode');

        if (!user) return res.status(404).json({ message: 'User not found' });

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error while fetching profile.' });
    }
};





module.exports = {userProfile};
