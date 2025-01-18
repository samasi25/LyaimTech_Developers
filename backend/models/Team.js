const mongoose = require("mongoose");


const teamSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    matchId: {
        type: String,
        required: true
    },
    selectedPlayers: {
        type: Array,
        required: true
    },
    substitutes: {
        type: Array,
        required: true
    },
});

const Team = mongoose.model('team', teamSchema);

module.exports = Team;