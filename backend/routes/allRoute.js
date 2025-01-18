const express = require("express");
const { authenticate } = require("../middleware/auth")
const { Login, Signup } = require("../controllers/userControl");
const { userProfile } = require("../controllers/userProfile");
const { updateUserProfile } = require("../controllers/updateUserProfile");
const { logoutUser } = require("../controllers/logoutUser");
const { TeamChooseGet } = require("../controllers/teamChooseGet")
const { TeamChoosePost } = require("../controllers/teamChoosePost")



const router = express.Router();

// Auth Routes
router.post("/login", Login)
router.post("/signup", Signup)


// Profile Routes
router.get("/profile", authenticate, userProfile)
router.put("/profile/update", authenticate, updateUserProfile)

// Team Routes
router.get('/:matchId', authenticate, TeamChooseGet)
router.post("/save/:matchId", authenticate, TeamChoosePost)


// Logout Route
router.post("/logout", authenticate, logoutUser)




module.exports = router;
