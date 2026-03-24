import express from "express";
import passport from "../config/passport.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import crypto from "crypto";
import User from "../models/User.models.js" 
import { isAuthenticated } from "../middleware/auth.middleware.js";

const router = express.Router();


// register


router.post("/register",async(req,res)=>{
    const {name,email,password} =req.body;

    try{
        if(!name || !email || !password){
            return res.status(400).json({message:"all field are required"});
        }

        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:"use already exists"});
        }

        const  hashedpassword= await bcrypt.hash(password,10);

        const user = await User.create({
            name,
            email,
            password:hashedpassword,
        });

         const token = jwt.sign(
         { id: user._id },
         process.env.JWT_SECRET,
         { expiresIn: "7d" }
       );

        res.status(201).json({ token, user });
         }
           catch (error) {
            console.error("Register error:",error);
           res.status(500).json({ 
            message: "Server error",
            error:error.message,
            });
       
    }
});

// login


router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Sign up to continue" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/me", isAuthenticated, async(req,res)=>{
    try{
        const user= await User.findById(req.user_id).select("-password");

        if(!user){
            return res.status(404).json({message:"user not found"});
        }

        res.status(200).json(user);

    }
    catch(error){
        res.status(500).json({message:"server error"});
    }
});

//google auth

router.get(
  "/google", 
  passport.authenticate("google", { 
  scope: ["profile", "email"],
  prompt: "select_account",
 })
);


// google callback route


router.get("/google/callback", passport.authenticate("google",{session:false}),
async(req,res)=>{
    try{
        const token = jwt.sign(
            { id: req.user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );
        res.redirect(`https://ai-resume-builder-project-frontend.onrender.com/login?token=${token}`);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});


//github auth

router.get(
  "/github",
  passport.authenticate("github", {
    scope: ["user:email"],
  })
);

// GitHub callback
router.get(
  "/github/callback",
  passport.authenticate("github", { session: false }),
  async (req, res) => {
    const token = generateToken(req.user._id);

    res.redirect(`https://ai-resume-builder-project-frontend.onrender.com/login?token=${token}`);
  }
);

// forgot password
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const resetToken = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    user.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 minutes

    await user.save();

    const resetUrl = `https://ai-resume-builder-project-frontend.onrender.com/reset-password/${resetToken}`;

    nodemailer.createTestAccount((err, account) => {
      if (err) {
        console.error('Failed to create a testing account. ' + err.message);
        return res.status(500).json({ message: 'Email service error' });
      }

      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass
        }
      });

      const message = {
        from: '"ResumeForge" <noreply@resumeforge.com>',
        to: user.email,
        subject: 'Password Reset Request',
        text: `You requested a password reset. Please click the following link to reset your password: \n\n ${resetUrl} \n\nIf you did not request this, please ignore this email.`,
        html: `<p>You requested a password reset.</p><p>Please click the following link to reset your password:</p><p><a href="${resetUrl}">${resetUrl}</a></p><p>If you did not request this, please ignore this email.</p>`
      };

      transporter.sendMail(message, (err, info) => {
        if (err) {
          console.error('Error occurred. ' + err.message);
          user.resetPasswordToken = undefined;
          user.resetPasswordExpire = undefined;
          user.save();
          return res.status(500).json({ message: 'Email could not be sent' });
        }

        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        
        res.status(200).json({ message: 'Password reset link sent to email!', previewUrl: nodemailer.getTestMessageUrl(info) });
      });
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// reset password
router.post("/reset-password/:token", async (req, res) => {
  try {
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired reset link" });
    }

    const { password } = req.body;
    if (!password) {
        return res.status(400).json({ message: "Please provide a new password" });
    }

    user.password = await bcrypt.hash(password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
