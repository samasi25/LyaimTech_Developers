const express = require("express");
const { authenticate } = require("../middleware/auth")
const { login, signup } = require("../controllers/userControl")
const { userProfile } = require("../controllers/userProfile")
const { updateUserProfile } = require("../controllers/updateUserProfile");
const { logoutUser } = require("../controllers/logoutUser");
const { TeamChooseGet, TeamChoosePost, createLineUp } = require("../controllers/teamChooseGet")
const { MatchOverview, createMatch } = require("../controllers/matchOverview");
const { WalletPage, AddFunds, AddFundssSuccess, Withdrawal } = require("../controllers/wallet");
const { ContestHandle, JoinContest, checkUserContest, createContest } = require("../controllers/contest");
const { LeaderBoard, Finalize, CalculateScores } = require("../controllers/leaderboard");
const { contact } = require("../controllers/contact.controller.js");

const router = express.Router();

// Contact Routes
router.post('/api/contact', contact);

// Auth Routes
router.post("/login", login)
router.post("/signup", signup)

// Profile Routes
router.get("/profile", authenticate, userProfile)
router.put("/profile/update", authenticate, updateUserProfile)

// Team Routes
router.get('/team/choose/:matchId', authenticate, TeamChooseGet)
router.post("/team/choose/save/:matchId", authenticate, TeamChoosePost)

// Match Overview Route
router.get("/match/overview", authenticate, MatchOverview)

router.get('/contest/check-contest/:userId/:matchId', checkUserContest)

// Wallet Route
router.get("/wallet", authenticate, WalletPage);
router.post("/wallet/add-funds", authenticate, AddFunds);
router.get("/wallet/add-funds/success", authenticate, AddFundssSuccess);
router.post("/wallet/withdraw", authenticate, Withdrawal);

//Contest Route
// router.get("/contest", authenticate, ContestHandle);
router.get("/contest/:matchId", authenticate, ContestHandle);
router.post("/contest/join", authenticate, JoinContest)

//LeaderBoard Route
router.get("/leaderboard", authenticate, LeaderBoard)
router.post("/leaderboard/finalize/:contestId", authenticate, Finalize)
router.post("/leaderboard/calculate/scores", authenticate, CalculateScores)

// Logout Route
router.post("/logout", authenticate, logoutUser)

// admin routes
router.post("/admin/match", authenticate, createMatch)
router.post("/admin/contest", authenticate, createContest)
router.post("/admin/team", authenticate, createLineUp)

module.exports = router;
