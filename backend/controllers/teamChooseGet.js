const Lineup = require('../models/Lineup.js');

// GET: Fetch lineup and team data
const TeamChooseGet = async (req, res) => {
    const { matchId } = req.params;
    const userId = req.id;

    try {
        if (!matchId) {
            return res.status(400).json({ message: 'Match ID is required.' });
        }


        // Fetch lineup data
        const lineups = await Lineup.find({ matchId });
        if (!lineups.length) {
            return res.status(404).json({ message: 'No lineup data found for this match.' });
        }

        // Group players by team
        const lineupData = lineups.reduce((acc, player) => {
            if (!acc[player.teamName]) {
                acc[player.teamName] = [];
            }
            acc[player.teamName].push({
                playerId: player.playerId,
                playerName: player.playerName,
                position: player.position,
            });
            return acc;
        }, {});

        // Fetch existing team data
        const team = await Team.findOne({ userId, matchId });

        if (team) {
            return res.json({
                lineups: lineupData,
                selectedPlayers: team.selectedPlayers,
                selectedSubstitutes: team.substitutes,
                isTeamCreated: true,
            });
        }

        return res.json({ lineups: lineupData, isTeamCreated: false });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching lineup', error: error.message });
    }
};


module.exports = { TeamChooseGet };
