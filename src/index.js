import 'dotenv/config'
import cookieParser from "cookie-parser";
import express from "express";
import cors from 'cors'
import connectDB from './db/connectDB.js';
import UserRouter from './routes/UserRouter.js';
import ErrorHandler from './middleware/ErrorHandler.js';

const app = express();

// Express JSON
app.use(express.json())

// Cokie Parser
app.use(cookieParser())

// Cors
app.use(cors())


// User
app.use("/api/users", UserRouter)

app.use(ErrorHandler)

// Serevr Port
app.listen(process.env.PORT, async(err)=>{
    
    await connectDB();

    if(err){
        return console.log(err)
    }

    console.log("Server is running on port " + process.env.PORT)
})