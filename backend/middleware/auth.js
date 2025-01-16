const jwt = require("jsonwebtoken");

/**
 * Middleware to verify JWT token and attach decoded user data to the request object.
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {function} next - Express next middleware function.
 */

const verifyToken = (req, res, next) => {
    try {
        // Extract token from Authorization header or cookies
        const authHeader = req.header('Authorization');
        const token = authHeader?.startsWith('Bearer ')
            ? authHeader.split(' ')[1]
            : req.cookies?.token;

        if (!token) {
            return res.status(403).json({
                success: false,
                message: 'No token provided, authorization denied.',
            });
        }

        // Verify token using the secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET);


        req.user = decoded;

        // Proceed to the next middleware or route handler
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

module.exports = verifyToken;
