import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import passport from "./config/passport.js";
import session from "express-session";


const app= express();

app.use(
    cors({
        origin:"http://localhost:3000",
        credentials:true,
    })
);

app.use(express.json());

app.use(
    session({
        secret:"secretkey",
        resave:false,
        saveUninitialized:false,
        })
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/",(req,res)=>{
    res.send("application is running");
});

app.get("/auth/google",passport.authenticate("google",{scope:["profile","email"]})
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    successRedirect: "http://localhost:3000",
  })
);


mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("MonoDB is conneted");
    app.listen(5000,()=>{
        console.log("server is running at 3000");
        
    })
    
}).catch((err)=>
console.log(err)
);
