import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import './db/database.js';  // Assuming this file contains the database connection setup
import UserRouter from './routes/user.js';
import BlogRouter from './routes/blog.js';

// Configuration of dotenv 
dotenv.config();

// Creating express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors({ credentials: true }));

// Routes
app.use('/api/user', UserRouter);
app.use('/api/blog', BlogRouter);

// Default route
app.get('/', (req, res) => {
    res.send('Hello');
});

// Data from env file
const port = process.env.PORT;

// Server listening
app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});
