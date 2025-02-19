// const { User } = require('../models/user');
// const Contest = require('../models/Contest');
// const Team = require('../models/Team');
// const PlayerStats = require('../models/PlayerStats');

// //  Fetch contests the user has joined for a specific match
// const LeaderBoard = async (req, res) => {
//     try {
//         const userId = req.user.id;
//         const matchId = req.query.matchId;

//         if (!matchId) {
//             return res.status(400).json({ message: "matchId is required." });
//         }

//         //  Fix: Fetch contests using `players.userId` 
//         const contests = await Contest.find({
//             matchId: matchId,
//             'players.userId': userId,
//         }).populate({
//             path: 'players.userId',
//             select: 'username'
//         });

//         if (!contests || contests.length === 0) {
//             return res.status(404).json({ message: "You have not joined any contests for this match." });
//         }

//         //  Prepare leaderboard data
//         const contestsWithPlayers = contests.map((contest) => {
//             const players = contest.players.map(player => ({
//                 username: player.userId.username,
//                 score: player.totalPoints || 0,
//                 winning: 0,
//             }));

//             players.sort((a, b) => b.score - a.score);
//             players.forEach((player, index) => {
//                 player.rank = index + 1;
//             });

//             return {
//                 contestName: contest.name,
//                 entryFee: contest.entryFee,
//                 prizePool: contest.prizePool,
//                 players,
//             };
//         });

//         res.status(200).json({ contests: contestsWithPlayers });
//     } catch (error) {
//         console.error("Error fetching contests:", error);
//         return res.status(500).json({ message: error.message });
//     }
// };

// //  Finalize match and distribute winnings
// const Finalize = async (req, res) => {
//     try {
//         const contestId = req.params.contestId;

//         //  Fetch contest & ensure it exists
//         const contest = await Contest.findById(contestId).populate('players.userId');
//         if (!contest) {
//             return res.status(404).json({ message: "Contest not found." });
//         }

//         const { prizePool, players } = contest;
//         const numPlayers = players.length;

//         //  Ensure there are players
//         if (numPlayers === 0) {
//             return res.status(400).json({ message: "No players in this contest." });
//         }

//         //  Sort players by score
//         players.sort((a, b) => b.totalPoints - a.totalPoints);
//         const distribution = distributePrizePool(prizePool, numPlayers);

//         //  Wallet update logic
//         await Promise.all(players.map(async (player, index) => {
//             const winningAmount = distribution[index] || 0;
//             if (winningAmount > 0) {
//                 await User.updateOne(
//                     { _id: player.userId._id },
//                     {
//                         $inc: {
//                             'wallet.totalMoney': winningAmount,
//                             'wallet.withdrawableAmount': winningAmount,
//                             'wallet.winningAmount': winningAmount,
//                         },
//                     }
//                 );
//             }
//         }));

//         res.status(200).json({ message: "Match finalized and results saved." });
//     } catch (error) {
//         console.error('Error finalizing contest:', error);
//         return res.status(500).json({ message: error.message });
//     }
// };

// // 🛠 Calculate scores for all users in a match
// const CalculateScores = async (req, res) => {
//     try {
//         const matchId = req.body.matchId;

//         if (!matchId) {
//             return res.status(400).json({ message: "matchId is required." });
//         }

//         //  Fetch teams
//         const teams = await Team.find({ matchId }).populate('userId', 'username');
//         if (!teams || teams.length === 0) {
//             return res.status(404).json({ message: "No teams found for this match." });
//         }

//         //  Fetch player stats
//         const playerIds = teams.flatMap((team) =>
//             team.selectedPlayers.map(player => player.playerId)
//         );

//         const playerStats = await PlayerStats.find({ matchId, playerId: { $in: playerIds } });

//         //  Calculate total points
//         const updates = teams.map((team) => {
//             let totalPoints = 0;
//             team.selectedPlayers.forEach((player) => {
//                 const stats = playerStats.find(stat => String(stat.playerId) === String(player.playerId));
//                 if (stats) {
//                     let points = 0;
//                     points += stats.goals * 6;
//                     points += stats.assists * 3;
//                     points += Math.floor(stats.shots / 10) * 1;
//                     points += Math.floor(stats.passes / 50) * 2;
//                     points += stats.tackles * 2;
//                     points += stats.interceptions * 2;
//                     points -= stats.yellowCards * 1;
//                     points += stats.penaltiesScored * 5;
//                     totalPoints += points;
//                 }
//             });
//             return { teamId: team._id, totalPoints };
//         });

//         //  Update teams with calculated points
//         await Promise.all(
//             updates.map(update =>
//                 Team.findByIdAndUpdate(update.teamId, { totalPoints: update.totalPoints })
//             )
//         );

//         res.status(200).json({ message: "Scores calculated and updated successfully." });
//     } catch (error) {
//         console.error('Error calculating scores:', error);
//         return res.status(500).json({ message: error.message });
//     }
// };

// // 🛠 Prize pool distribution logic (Helper Function)
// function distributePrizePool(prizePool, numPlayers) {
//     try {
//         if (numPlayers <= 0) return [];

//         const distribution = [];
//         if (numPlayers === 2) {
//             distribution.push(prizePool * 0.44, prizePool * 0.06);
//         } else if (numPlayers === 3) {
//             distribution.push(prizePool * 0.44, prizePool * 0.04, prizePool * 0.02);
//         } else if (numPlayers === 4) {
//             distribution.push(prizePool * 0.44, prizePool * 0.03, prizePool * 0.04, prizePool * 0.02);
//         } else if (numPlayers === 5) {
//             distribution.push(
//                 prizePool * 0.44,
//                 prizePool * 0.03,
//                 prizePool * 0.015,
//                 prizePool * 0.01,
//                 prizePool * 0.005
//             );
//         }
//         return distribution;
//     } catch (error) {
//         console.error('Error distributing prize pool:', error);
//         return [];
//     }
// }

// module.exports = { LeaderBoard, Finalize, CalculateScores };





const { User } = require('../models/user');
const Contest = require('../models/Contest');
const Team = require('../models/Team');
const PlayerStats = require('../models/PlayerStats');

// 🎯 Fetch contests the user has joined for a specific match
const LeaderBoard = async (req, res) => {
    try {
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized: User not authenticated." });
        }

        const matchId = req.query.matchId;
        console.log("backend match id ", matchId)

        if (!matchId) {
            return res.status(400).json({ message: "matchId is required." });
        }

        // ✅ Check if user has joined any contest for this match
        const userContest = await Contest.findOne({
            matchId,
            'players.userId': userId,
        });

        if (!userContest) {
            return res.status(403).json({ message: "You have not joined any contests for this match." });
        }

        // ✅ Fetch only contests the user has joined
        const contests = await Contest.find({
            matchId,
            'players.userId': userId
        }).populate({
            path: 'players.userId',
            select: 'username'
        });

        if (!contests || contests.length === 0) {
            return res.status(404).json({ message: "No contests found for this match." });
        }

        // ✅ Prepare leaderboard data
        const contestsWithPlayers = contests.map((contest) => {
            const players = contest.players
                .map(player => ({
                    username: player.userId.username,
                    score: player.totalPoints || 0,
                    winning: player.winning || 0,  // ✅ Winning amount added
                }));

            players.sort((a, b) => b.score - a.score);
            players.forEach((player, index) => {
                player.rank = index + 1;
            });

            return {
                contestName: contest.name,
                entryFee: contest.entryFee,
                prizePool: contest.prizePool,
                players,
            };
        });

        res.status(200).json({ contests: contestsWithPlayers });
    } catch (error) {
        console.error("Error fetching contests:", error);
        return res.status(500).json({ message: error.message });
    }
};

// 🎯 Finalize match and distribute winnings
const Finalize = async (req, res) => {
    try {
        const contestId = req.params.contestId;

        // ✅ Fetch contest & ensure it exists
        const contest = await Contest.findById(contestId).populate('players.userId');
        if (!contest) {
            return res.status(404).json({ message: "Contest not found." });
        }

        const { prizePool, players, maxPlayers, entryFee } = contest;
        const numPlayers = players.length;

        // ✅ Ensure there are players
        if (numPlayers === 0) {
            return res.status(400).json({ message: "No players in this contest." });
        }

        // Sort players by score
        players.sort((a, b) => (b.totalPoints || 0) - (a.totalPoints || 0));
        const distribution = distributePrizePool(prizePool, numPlayers);

        //  Wallet update logic
        await Promise.all(players.map(async (player, index) => {
            const winningAmount = distribution[index] || 0;
            if (winningAmount > 0) {
                await User.updateOne(
                    { _id: player.userId._id },
                    {
                        $inc: {
                            'wallet.totalMoney': winningAmount,
                            'wallet.withdrawableAmount': winningAmount,
                            'wallet.winningAmount': winningAmount,
                        },
                    }
                );
            }
        }));

        // ✅ Refund logic if contest is not full
        if (numPlayers < maxPlayers) {
            const refundAmount = entryFee * 0.9; // 90% refund
            await Promise.all(players.map(async (player) => {
                await User.updateOne(
                    { _id: player.userId._id },
                    {
                        $inc: {
                            'wallet.totalMoney': refundAmount,
                            'wallet.depositAmount': refundAmount,
                        },
                    }
                );
            }));
        }

        res.status(200).json({ message: "Match finalized and results saved." });
    } catch (error) {
        console.error('Error finalizing contest:', error);
        return res.status(500).json({ message: error.message });
    }
};

// 🎯 Calculate scores for all users in a match
const CalculateScores = async (req, res) => {
    try {
        const matchId = req.body.matchId;

        if (!matchId) {
            return res.status(400).json({ message: "matchId is required." });
        }

        // ✅ Fetch teams
        const teams = await Team.find({ matchId }).populate('userId', 'username');
        if (!teams || teams.length === 0) {
            return res.status(404).json({ message: "No teams found for this match." });
        }

        // ✅ Fetch player stats
        const playerIds = teams.flatMap((team) =>
            team.selectedPlayers.map(player => player.playerId)
        );

        const playerStats = await PlayerStats.find({ matchId, playerId: { $in: playerIds } });

        // ✅ Calculate total points
        await Promise.all(
            teams.map(async (team) => {
                let totalPoints = 0;
                team.selectedPlayers.forEach((player) => {
                    const stats = playerStats.find(stat => String(stat.playerId) === String(player.playerId));
                    if (stats) {
                        totalPoints += (stats.goals || 0) * 6;
                        totalPoints += (stats.assists || 0) * 3;
                        totalPoints += Math.floor((stats.shots || 0) / 10) * 1;
                        totalPoints += Math.floor((stats.passes || 0) / 50) * 2;
                        totalPoints += (stats.tackles || 0) * 2;
                        totalPoints += (stats.interceptions || 0) * 2;
                        totalPoints -= (stats.yellowCards || 0) * 1;
                        totalPoints += (stats.penaltiesScored || 0) * 5;
                    }
                });
                await Team.findByIdAndUpdate(team._id, { totalPoints });
            })
        );

        res.status(200).json({ message: "Scores calculated and updated successfully." });
    } catch (error) {
        console.error('Error calculating scores:', error);
        return res.status(500).json({ message: error.message });
    }
};

module.exports = { LeaderBoard, Finalize, CalculateScores };
