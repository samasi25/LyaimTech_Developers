const mongoose = require("mongoose");

const WithdrawalRequestSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', required: true
    },
    requestedAmount: {
        type: Number,
        required: true
    },
    paypalId: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    dateRequested: {
        type: Date,
        default: Date.now
    },
    status: {

        type: String,
        enum: ['Pending', 'Completed', 'Rejected'],
        default: 'Pending'
    },
});

const WithdrawalRequest = mongoose.model("withdrawalrequest", WithdrawalRequestSchema)

module.exports = WithdrawalRequest

