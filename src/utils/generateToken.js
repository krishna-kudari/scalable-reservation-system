const jwt = require('jsonwebtoken');

/**
 * 
 * @param {string} userId 
 * @param {string} role [user | admin]
 * @returns return a signed token with payload containing userId and role
 */
const generateToken = (userId,role) => {
    return jwt.sign({ userId , role }, process.env.JWT_SECRET, { expiresIn: '24h' });
};

module.exports = generateToken;
