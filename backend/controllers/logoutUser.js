const logoutUser = (req, res) => {
    res.cookie('token', "", { expires: new Date(0) });
    res.json({ message: 'Logged out successfully.' });
};

module.exports= {logoutUser}