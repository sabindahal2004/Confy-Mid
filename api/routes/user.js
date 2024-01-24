import express from 'express';
import User from '../models/UserSchema.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import getAuth from '../middleware/auth.js';

const UserRouter = express.Router();
UserRouter.use(express.json());
dotenv.config();

// Regular expression for validating an Email
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

UserRouter.get('/', async (req, res) => {
    try {
        const result = await User.find();
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error });
    }
});

UserRouter.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: "Invalid email format" });
        }

        if (name && email && password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await User.create({ name, email, password: hashedPassword });
            res.status(200).json({ message: "User registered successfully", user });
        } else {
            res.status(400).json({ error: "Please fill in all the details" });
        }
    } catch (error) {
        res.status(400).json({ error });
    }
});

UserRouter.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const existUser = await User.findOne({ email });

        if (!existUser) {
            return res.status(404).json({ error: "User not found" });
        }

        const comparePassword = await bcrypt.compare(password, existUser.password);
        if (!comparePassword) {
            return res.status(400).json({ error: "Password is incorrect" });
        }

        const token = jwt.sign({ id: existUser._id }, process.env.SECRET);
        res.status(201).json({ message: "User logged in successfully", token });
    } catch (error) {
        res.status(400).json({ error });
    }
});

UserRouter.get('/auth', getAuth, (req, res) => {
    res.status(200).json(req.auth);
});

export default UserRouter;
