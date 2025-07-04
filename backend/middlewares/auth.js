const User = require('../models/User');

// Simplified version - for demo/development purposes only
// In a real app, you would use sessions or a more secure approach
exports.protect = async (req, res, next) => {
    try {
        // Get the user ID from the request header
        const userId = req.headers['x-user-id'];

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: 'Not authorized to access this route. Please log in.'
            });
        }

        // Get user from database
        const user = await User.findById(userId);

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'User not found'
            });
        }

        // Set req.user
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Not authorized to access this route'
        });
    }
};

// Grant access to specific roles
exports.authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: `User role ${req.user.role} is not authorized to access this route`
            });
        }
        next();
    };
}; 