"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const config_1 = require("./config");
const jwt = require('jsonwebtoken');
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(403).json({ message: "Authorization header required" });
        return;
    }
    const token = authHeader.split(" ")[1];
    let authenticate;
    try {
        authenticate = jwt.verify(token, config_1.JWT_SECRET);
    }
    catch (err) {
        res.status(403).json({ message: "Invalid token" });
        return;
    }
    req.userid = authenticate.userid;
    next();
};
exports.authMiddleware = authMiddleware;
module.exports = { authMiddleware: exports.authMiddleware };
