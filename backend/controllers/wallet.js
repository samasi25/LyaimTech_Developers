const dotenv = require('dotenv');
const paypal = require('@paypal/checkout-server-sdk');
const { User } = require('../models/user.js');
const WithdrawalRequest = require('../models/WithdrawalRequest.js');

dotenv.config();

// PayPal SDK Environment Configuration
// const environment = new paypal.core.SandboxEnvironment(
//     process.env.PAYPAL_CLIENT_ID,
//     process.env.PAYPAL_CLIENT_SECRET
// );
// const client = new paypal.core.PayPalHttpClient(environment);

// GET: Fetch Wallet Data
const WalletPage = async (req, res) => {
    const userId = req.user._id;

    try {
        const user = await User.findById(userId, 'wallet');
        if (!user) {
            return res.status(404).json({ success: false, message: 'Wallet not found.' });
        }
        res.status(200).json({ success: true, wallet: user.wallet });
    } catch (error) {
        console.error('Error fetching wallet data:', error);
        res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
    }
};

// POST: Create PayPal Order for Adding Funds
const AddFunds = async (req, res) => {
    const { amount } = req.body;
    const userId = req.user._id;

    if (!Number.isFinite(amount) || amount < 10) {
        return res.status(400).json({ success: false, message: 'Minimum deposit amount is $10.' });
    }

    try {
        const order = new paypal.orders.OrdersCreateRequest();
        order.requestBody({
            intent: 'CAPTURE',
            purchase_units: [
                {
                    amount: {
                        currency_code: 'USD',
                        value: amount.toFixed(2),
                    },
                },
            ],
            // application_context: {
            //     return_url: `${process.env.BASE_URL}/wallet/add-funds/success`,
            //     cancel_url: `${process.env.BASE_URL}/wallet/add-funds/cancel`,
            //     user_action: 'PAY_NOW',
            // },
        });

        const response = await client.execute(order);
        const approvalUrl = response.result.links.find(link => link.rel === 'approve').href;

        res.status(200).json({ success: true, approvalUrl });
    } catch (error) {
        console.error('Error creating PayPal order:', error);
        res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
    }
};

// Handle PayPal Payment Success
const AddFundssSuccess = async (req, res) => {
    const userId = req.user._id;
    const { token } = req.query;

    if (!token) {
        return res.status(400).json({ success: false, message: 'Invalid payment data.' });
    }

    try {
        const captureRequest = new paypal.orders.OrdersCaptureRequest(token);
        captureRequest.requestBody({});
        const captureResponse = await client.execute(captureRequest);

        const amount = parseFloat(captureResponse.result.purchase_units[0].payments.captures[0].amount.value);
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                $inc: {
                    'wallet.depositAmount': amount,
                    'wallet.totalMoney': amount,
                },
            },
            { new: true }
        );

        res.status(200).json({ success: true, message: 'Payment successful, funds added!', wallet: updatedUser.wallet });
    } catch (error) {
        console.error('Error completing PayPal payment:', error);
        res.status(500).json({ success: false, message: 'Error processing payment. Please try again.' });
    }
};

// POST: Withdraw Funds
const Withdrawal = async (req, res) => {
    const { amount, paypalId, age } = req.body;
    const userId = req.user._id;

    if (!Number.isFinite(amount) || amount < 50 || amount > 10000) {
        return res.status(400).json({ success: false, message: 'Invalid withdrawal amount.' });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(paypalId) || !Number.isInteger(age)) {
        return res.status(400).json({ success: false, message: 'Invalid PayPal ID or age.' });
    }

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found.' });
        }

        const { wallet } = user;
        if (wallet.withdrawableAmount < amount || wallet.winningAmount < amount) {
            return res.status(400).json({ success: false, message: 'Insufficient funds for withdrawal.' });
        }

        const withdrawalRequest = new WithdrawalRequest({
            userId,
            requestedAmount: amount,
            paypalId,
            age,
        });
        await withdrawalRequest.save();

        await User.findByIdAndUpdate(
            userId,
            {
                $inc: {
                    'wallet.withdrawableAmount': -amount,
                    'wallet.winningAmount': -amount,
                    'wallet.totalMoney': -amount,
                },
            },
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: 'Withdrawal request submitted successfully! You will receive your money within 6 hours.',
        });
    } catch (error) {
        console.error('Error processing withdrawal:', error);
        res.status(500).json({ success: false, message: 'Error processing withdrawal. Please try again.' });
    }
};

module.exports = { WalletPage, AddFunds, AddFundssSuccess, Withdrawal };
