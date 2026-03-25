const jwt = require('jsonwebtoken');
const User = require('../models/User');


const protect = async (req, res, next) => {
  try {
    // Extract token from Authorization header
    const authHeader = req.headers.authorization;

    // Check if Authorization header exists and follows Bearer format
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'No token provided. Please login to access this resource.',
      });
    }

    // Extract the token (remove 'Bearer ' prefix)
    const token = authHeader.slice(7);

    // Verify the token using JWT_SECRET from environment variables
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user by the decoded user id (token payload uses 'userId')
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User not found. Invalid token.',
      });
    }

    // Attach user data to request object (excluding password)
    req.user = user.toObject();
    delete req.user.password;

    // Proceed to next middleware or route handler
    next();
  } catch (error) {
    // Handle JWT validation errors
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Invalid token. Please login again.',
      });
    }

    // Handle token expiration
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token has expired. Please login again.',
      });
    }

    // Handle unexpected errors
    return res.status(500).json({
      success: false,
      message: 'Authentication error. Please try again later.',
    });
  }
};

module.exports = { protect };
