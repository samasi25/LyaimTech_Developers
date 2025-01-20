const express = require("express");
const { authenticate } = require("../middleware/auth")
const { login, signup } = require("../controllers/userControl")
const { userProfile } = require("../controllers/userProfile")
const { updateUserProfile } = require("../controllers/updateUserProfile");
const { logoutUser } = require("../controllers/logoutUser");
const { TeamChooseGet } = require("../controllers/teamChooseGet")
const { TeamChoosePost } = require("../controllers/teamChoosePost");
const { MatchOverview } = require("../controllers/matchOverview");



const router = express.Router();

// Auth Routes
router.post("/login", login)
router.post("/signup", signup)


// Profile Routes
router.get("/profile", authenticate, userProfile)
router.put("/profile/update", authenticate, updateUserProfile)

// Team Routes
router.get('/:matchId', authenticate, TeamChooseGet)
router.post("/save/:matchId", authenticate, TeamChoosePost)
router.get("/match/overview", authenticate, MatchOverview)



// Logout Route
router.post("/logout", authenticate, logoutUser)




module.exports = router;
