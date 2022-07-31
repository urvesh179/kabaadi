const GarbageCollector = require('../models/gcmodel');
const jwt = require("jsonwebtoken");

const gcauth = async (req, res, next) => {
    try {
        const token = req.header("authorization").replace("Bearer ", "");
        const valid = await jwt.verify(token, process.env.GC_JWT_SECERET);
        const gc = await GarbageCollector.findById(valid.gcId);
        if (!gc) {
            return res.status(404).send("Garbage Collector Not Found")
            // throw new Error("user not found");
        }
        req.gc = gc;
        req.token = token;
        next();
    } catch (e) {
        return res.status(403).send("not authenticated");
    }
}

module.exports = gcauth;