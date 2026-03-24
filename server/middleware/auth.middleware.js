import jwt from "jsonwebtoken";
import User from "../models/User.models.js";


export const isAuthenticated = async (req,res,next)=>{
    const authHeader= req.headers.authorization;

    if(!authHeader || !authHeader.startsWith("Bearer")){
        return res.status(401).json({message:"unauthorized"});
    }

    const token = authHeader.split(" ")[1];
    try{

        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        req.user_id = decoded.id;
        next();
    }
    catch (error){
        return res.status(401).json({message:"Invalid token"})
    }
};
