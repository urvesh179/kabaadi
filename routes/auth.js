const User = require('../models/usermodel');
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
    try {
        const token = req.header("authorization").replace("Bearer ", "");
        const valid = await jwt.verify(token, process.env.JWT_SECERET);
        const user = await User.findById(valid.userId);
        if (!user) {
            throw new Error("user not found");
        }
        req.user = user;
        req.token = token;
        next();
    } catch (e) {
        return res.status(403).send("not authenticated");
    }
}

module.exports = auth;