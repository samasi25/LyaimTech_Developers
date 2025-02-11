const jwt = require("jsonwebtoken");

/**
 * Middleware to verify JWT token and attach decoded user data to the request object.
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {function} next - Express next middleware function.
 */

const authenticate = (req, res, next) => {
    try {
        // Extract token from Authorization header or cookies
        let token = req.cookies?.token || req.headers.authorization?.split(" ")[1];


        if (!token) {
            return res.status(403).json({
                success: false,
                message: 'No token provided, please login first.',
            });
        }

        // Verify token using the secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        // Token Valid, Move to Next Middleware
        next();

    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                message: 'Token has expired. Please log in again..',
            });
        }

        return res.status(401).json({
            success: false,
            message: 'Invalid token.',
            error: error.message,
        });
    }
};

module.exports = { authenticate };
