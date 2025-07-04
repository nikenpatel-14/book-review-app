const User = require('../models/User');

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res) => {
    try {
        console.log('Register endpoint called with body:', req.body);
        const { name, email, password, role } = req.body;

        // Check if all required fields are provided
        if (!name || !email || !password) {
            console.log('Missing required fields');
            return res.status(400).json({
                success: false,
                message: 'Please provide name, email, and password'
            });
        }

        // Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            console.log('User already exists:', email);
            return res.status(400).json({
                success: false,
                message: 'User already exists'
            });
        }

        // Create user
        console.log('Creating new user with role:', role || 'student');
        const user = await User.create({
            name,
            email,
            password,
            role: role || 'student' // default to student if not specified
        });

        console.log('User created successfully:', user._id);

        // Create a simple user object without the password
        const userResponse = {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        };

        res.status(201).json({
            success: true,
            user: userResponse
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate email & password
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide an email and password'
            });
        }

        // Check for user
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        // Check if password matches
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        // Create a user object for the response (without password)
        const userResponse = {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        };

        res.status(200).json({
            success: true,
            user: userResponse
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        res.status(200).json({
            success: true,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
}; 