const jwt = require('jsonwebtoken');
const { models: { User } } = require('../db');

const authMiddleware = async (req, res, next) => {
  try {
    // Retrieve the token from the request headers
    const token = req.headers.authorization;

    if (!token) {
      // If the token is missing, return an error response
      return res.status(401).json({ error: 'No token provided' });
    }

    // Verify and decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user associated with the token
    const user = await User.findByPk(decoded.id);

    if (!user) {
      // If the user doesn't exist, return an error response
      return res.status(401).json({ error: 'Invalid token' });
    }

    // Attach the user object to the request for future use
    req.user = user;

    // Call the next middleware or route handler
    next();
  } catch (err) {
    // Handle any errors that occurred during authentication
    res.status(401).json({ error: 'Authentication failed' });
  }
};

module.exports = authMiddleware;
