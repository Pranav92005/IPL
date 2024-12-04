import { JWT_SECRET } from './config';
const jwt = require('jsonwebtoken');
import { Request, Response, NextFunction } from 'express';

interface AuthenticatedRequest extends Request {
    userid?: string;
}

export const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(403).json({ message: "Authorization header required" });
        return;
    }
    const token = authHeader.split(" ")[1];
    let authenticate: any;
    try {
        authenticate = jwt.verify(token, JWT_SECRET) as { userid: string };
    } catch (err) {
        res.status(403).json({ message: "Invalid token" });
        return;
    }
    req.userid = authenticate.userid;
    next();
};
module.exports = { authMiddleware };