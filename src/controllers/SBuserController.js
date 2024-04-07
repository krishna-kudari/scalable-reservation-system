const { createUser, findUserByUsername } = require('../models/SBUser');
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken');

/**
 * @description the following function creates a user.
 * @param {express request} req coming from client for creating a user.
 * @param {express response} res response object that will be sent back.
 * @returns an object containing user details if booking successfull.
 */
exports.registerUser = async (req, res) => {
    const { username, password, role } = req.body;

    if(role === 'admin' && !isRequestAuthorized(req)) {
        return res.status(403).send("Unauthorized: Missing or invalid API key");
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const response = await createUser(username, hashedPassword, role);
        res.status(201).json({"message": "user created successfully, please login to continue", data: response});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/**
 * @description the following function will lgoin a user and gives an access Token for subsequent requests for protected requests.
 * @param {express request} req coming from client for booking a seat.
 * @param {express response} res response object that will be sent back.
 * @returns an object containing booking details if booking successfull.
 */
exports.loginUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await findUserByUsername(username);
        if (user && await bcrypt.compare(password, user.password)) {
            const token = generateToken(user.id,user.role);
            res.json({ username: user.username, token });
        } else {
            res.status(400).send("Invalid credentials");
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/**
 * @description the following function validates the apiKey
 * @param {express request} req coming from client for registering a admin.
 * @param {express response} res response object that will be sent back.
 * @returns {boolean} whether the apiKey matches with the expected api key or not.
 */
function isRequestAuthorized(req) {
    const { apiKey } = req.query;
    const expectedApiKey = process.env.ADMIN_API_KEY;

    if(!apiKey || apiKey !== expectedApiKey) {
        return false;
    }
    return true;
}