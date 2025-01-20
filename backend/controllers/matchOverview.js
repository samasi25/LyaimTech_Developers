const moment = require('moment-timezone');
const Match = require('../models/matches');


// Utility function to convert UTC to New York time
function convertToNewYorkTime(dateTime) {
    try {
        if (typeof dateTime !== 'string') {
            throw new Error('Invalid date format. Expected a string.');
        }

        const trimmedDateTime = dateTime.trim();
        const momentDate = moment.utc(trimmedDateTime);

        if (!momentDate.isValid()) {
            throw new Error('Invalid date format. Unable to parse date.');
        }

        return momentDate.tz('America/New_York').format('YYYY-MM-DD HH:mm:ss');
    } catch (error) {
        console.error('Error in convertToNewYorkTime:', error.message);
        throw error; // Rethrow to handle in the calling function
    }
}

// Function to get matches by status
async function getMatchesByStatus(status) {
    try {
        return await Match.find({ status }).lean();
    } catch (error) {
        console.error(`Error fetching matches with status "${status}":`, error.message);
        throw new Error('Database query failed. Please try again later.');
    }
}

// Function to update match status
async function updateMatchStatusToLive(matchId) {
    try {
        const result = await Match.findByIdAndUpdate(matchId, { status: 'Live' });
        if (!result) {
            throw new Error(`No match found with ID: ${matchId}`);
        }
    } catch (error) {
        console.error(`Error updating match with ID "${matchId}" to Live:`, error.message);
        throw error;
    }
}

// Route to fetch match overview
const MatchOverview = async (req, res) => {
    console.log("Match overview route hit!");
    try {
        // Fetch matches by status
        const upcomingMatches = await getMatchesByStatus('Upcoming');
        const liveMatches = await getMatchesByStatus('Live');
        const completedMatches = await getMatchesByStatus('Completed');

        // Get current time in New York timezone
        const currentTime = moment().tz('America/New_York');

        // Update matches from 'Upcoming' to 'Live'
        for (const match of upcomingMatches) {
            const matchDateTime = moment(match.match_date);
            if (matchDateTime.isBefore(currentTime)) {
                await updateMatchStatusToLive(match._id);
            }
        }

        // Re-fetch updated matches
        const [updatedUpcomingMatches, updatedLiveMatches, updatedCompletedMatches] = await Promise.all([
            getMatchesByStatus('Upcoming'),
            getMatchesByStatus('Live'),
            getMatchesByStatus('Completed')
        ]);

        // Process matches
        const limitedUpcomingMatches = updatedUpcomingMatches.slice(0, 16).map(match => {
            try {
                const formattedDateTime = convertToNewYorkTime(match.match_date.toISOString());
                return {
                    id: match._id,
                    home_team: match.home_team,
                    away_team: match.away_team,
                    match_date: formattedDateTime,
                    status: 'Upcoming',
                    redirect: '/team-choose/' + match._id
                };
            } catch (error) {
                console.error(`Skipping invalid match in Upcoming: ${match._id}`);
                return null;
            }
        }).filter(Boolean);

        const processedLiveMatches = updatedLiveMatches.map(match => {
            try {
                const formattedDateTime = convertToNewYorkTime(match.match_date.toISOString());
                return {
                    id: match._id,
                    home_team: match.home_team,
                    away_team: match.away_team,
                    match_date: formattedDateTime,
                    status: 'Live',
                    // redirect: '/leaderboard/' + match._id
                };
            } catch (error) {
                console.error(`Skipping invalid match in Live: ${match._id}`);
                return null;
            }
        }).filter(Boolean);

        const processedCompletedMatches = updatedCompletedMatches.map(match => {
            try {
                const formattedDateTime = convertToNewYorkTime(match.match_date.toISOString());
                return {
                    id: match._id,
                    home_team: match.home_team,
                    away_team: match.away_team,
                    match_date: formattedDateTime,
                    status: 'Completed',
                    // redirect: '/match/details/' + match._id
                };
            } catch (error) {
                console.error(`Skipping invalid match in Completed: ${match._id}`);
                return null;
            }
        }).filter(Boolean);

        // Send response
        res.json({
            upcoming: limitedUpcomingMatches,
            live: processedLiveMatches,
            completed: processedCompletedMatches
        });
    } catch (error) {
        console.error('Error fetching match overview:', error.message);

        res.status(500).json({
            message: 'An unexpected error occurred while fetching the match overview.',
            error: error.message
        });
    }
};

module.exports = { MatchOverview };
