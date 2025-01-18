const Team = require('../models/Team.js');


// POST: Create or update team data
const TeamChoosePost = async (req, res) => {
    const { matchId } = req.params;
    const { selectedPlayers, selectedSubstitutes } = req.body;
    const userId = req.id;

    // Validate 
    if (!matchId) {
        return res.status(400).json({ message: 'Match ID is required.' });
    }

    if (!Array.isArray(selectedPlayers) || !Array.isArray(selectedSubstitutes)) {
        return res.status(400).json({ message: 'Selected players and substitutes must be arrays.' });
    }

    if (selectedPlayers.length !== 12) {
        return res.status(400).json({ message: 'You must select exactly 12 players.' });
    }

    if (selectedSubstitutes.length !== 2) {
        return res.status(400).json({ message: 'You must select exactly 2 substitutes.' });
    }

    try {
        // Check team limit
        const existingTeams = await Team.countDocuments({ userId, matchId });
        if (existingTeams >= 10) {
            return res.status(400).json({ message: 'You can create a maximum of 10 teams for this match.' });
        }

        // Validate team player limits
        const teamCounts = selectedPlayers.concat(selectedSubstitutes).reduce((acc, player) => {
            if (!player.team || !player.playerId) {
                throw new Error('Each player must have a valid team and playerId.');
            }
            acc[player.team] = (acc[player.team] || 0) + 1;
            return acc;
        }, {});

        for (let team in teamCounts) {
            if (teamCounts[team] > 7) {
                return res.status(400).json({ message: 'You can select a maximum of 7 players from one team.' });
            }
        }

        // Validate substitutes team limit
        const substitutesTeamCounts = selectedSubstitutes.reduce((acc, player) => {
            acc[player.team] = (acc[player.team] || 0) + 1;
            return acc;
        }, {});

        for (let team in substitutesTeamCounts) {
            if (substitutesTeamCounts[team] > 1) {
                return res.status(400).json({ message: 'You can select a maximum of 2 substitutes from each team.' });
            }
        }

        // Check if team exists
        const existingTeam = await Team.findOne({ userId, matchId });

        if (existingTeam) {
            // Update existing team
            existingTeam.selectedPlayers = selectedPlayers;
            existingTeam.substitutes = selectedSubstitutes;
            await existingTeam.save();
            return res.status(200).json({ message: 'Team updated successfully.' });
        }

        // Create new team
        const newTeam = new Team({
            userId,
            matchId,
            selectedPlayers,
            substitutes,
        });

        await newTeam.save();
        return res.status(201).json({ message: 'Team created successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Error saving team', error: error.message });
    }
};


module.exports = { TeamChoosePost }