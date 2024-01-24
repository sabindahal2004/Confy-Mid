import User from '../models/UserSchema.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const getAuth = async (req, res, next) => {
    try {
        const token = req.headers.token;

        if (!token) {
            return res.status(401).json({ error: "Token is missing. Unauthorized user." });
        }

        const verifyToken = jwt.verify(token, process.env.SECRET);
        const auth = await User.findById(verifyToken.id);

        if (!auth) {
            return res.status(401).json({ error: "Invalid token. Unauthorized user." });
        }

        req.userId = verifyToken.id;
        req.auth = auth;
        next();
    } catch (error) {
        res.status(401).json({ error: "Unauthorized user." });
    }
};

export default getAuth;
