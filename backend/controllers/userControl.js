const User = require("../models/user");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");


const Login = async (req, res) => {
    const { email, password } = req.body;


    try {
        const user = await User.findOne({ email });



        if (!user) {
            console.log("incorrect credentials!")
            return res.status(400).json({ message: 'Email and Password is not Correct' })
        }

        bcrypt.compare(password, user.password, (err, result) => {

            if (err) {
                console.log("incorrect credentials!")
                return res.status(500).json({ message: 'incorrect credentials!' })
            }

            if (!result) {
                console.log("error in result || comparing password")
                return res.status(401).json({ message: 'incorrect credentials!' })
            }

            return res.status(200).json({ message: 'You are Login successfully' })

        });

    } catch (error) {
        console.log("error in login process", error)
        return res.status(500).json({ message: 'Internal Server Error' })
    }
};



const Signup = async (req, res) => {

    const { username, email, mobileNo, password, referralCode } = req.body;

    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        await User.create({
            username,
            email,
            mobileNo,
            password: hash,
            referralCode,
        })

        return res.status(200).json({ msg: "Successfully register" })

    } catch (error) {
        console.log(error, "error")
        return res.status(500).json({ message: 'Internal Server Error' })
    }

}




module.exports = { Login, Signup }