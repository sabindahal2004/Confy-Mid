import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const db_url = process.env.MONGO_URL;
mongoose.connect(db_url)
.then(()=>console.log("Database connection success!!"))
.catch(err => console.log(err));
