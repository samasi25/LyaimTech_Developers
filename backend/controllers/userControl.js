const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/*** Login Controller*/

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and Password are required." });
    }

    try {
        const user = await User.findOne({ email });

        if (!user) {
            console.error("User not found.");
            return res.status(400).json({ message: "Invalid email or password." });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            console.error("Password mismatch.");
            return res.status(401).json({ message: "Invalid email or password." });
        }

        const token = jwt.sign(
            { email: user.email, id: user.id },
            process.env.JWT_SECRET,
            { expiresIn: "2h" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            // secure: process.env.NODE_ENV === "production", // Use secure cookies in production
            maxAge: 2 * 60 * 60 * 1000,
        });

        return res.status(200).json({ message: "Login successful" });
    } catch (error) {

        return res.status(500).json({ message: "Internal Server Error" });
    }
};

/** * Signup Controller */

const signup = async (req, res) => {
    const { username, email, mobileNo, password, referralCode } = req.body;

    if (!username || !email || !mobileNo || !password) {
        return res.status(400).json({ message: "All fields are required." });
    }

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({ message: "Email already in use." });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            mobileNo,
            password: hashedPassword,
            referralCode,
        });

        await newUser.save();

        return res.status(201).json({ message: "User registered successfully." });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = { login, signup };
