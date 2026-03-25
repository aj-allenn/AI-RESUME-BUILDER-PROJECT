

import dotenv from 'dotenv';
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import resumeRoutes from "./routes/resume.routes.js";
import aiRoutes from "./routes/ai.routes.js";
import passport from "./config/passport.js";

const app= express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  process.env.FRONTEND_URL,
  process.env.FRONTEND_URL_PROD
];

app.use(
    cors({
        origin:allowedOrigins,
        credentials:true,
    })
);

app.use(express.json());


app.use(passport.initialize());

app.get("/",(req,res)=>{
    res.send("application is running");
});

app.use("/auth", authRoutes);
app.use("/api/resumes", resumeRoutes);
app.use("/api/ai", aiRoutes);
app.use("/uploads",express.static("uploads"));

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("MongoDB is conneted");
    app.listen(PORT,()=>{
        console.log(`server is running at ${PORT}`);
        
    })
    
}).catch((err)=>
console.log(err)
);
