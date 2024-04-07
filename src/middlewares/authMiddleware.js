const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET;

/**
 * @description the followind middleware validates the Authorization header(Bearer Token).
 * @param {express request} req coming from client.
 * @param {express response} res response object that will be sent back.
 * @param {callback} next function for executing the next operation.
 * @returns void.
 */
exports.authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Bearer <token>

  if (!token) {
    return res.status(403).json({ message: "Authentication token required" });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

/**
 * @description the followind middleware validates the role of the user.
 * @param {Array of roles allowed for the resource} allowedRoles.
 * @returns a express middleware function that validates the role of a user for admin routes.
 */
exports.authorize = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(403).json({ message: "Authentication required" });
    }
    
    const { role } = req.user;

    if (!allowedRoles.includes(role)) {
      return res.status(403).json({ message: "You do not have permission to perform this action" });
    }

    next();
  };
};
