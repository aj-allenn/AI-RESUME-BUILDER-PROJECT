import express from "express";
import Resume from "../models/Resume.models.js";
import multer from "multer";
import path from "path";
import { isAuthenticated } from "../middleware/auth.middleware.js";
import fs from "fs";
import pdf from "pdf-parse";
import PdfParse from "pdf-parse";


const router = express.Router();

const uploadDir = "uploads";

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}
//multer setup

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files allowed"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
});


// Get all resumes for a user
router.get("/", isAuthenticated, async (req, res) => {
  try {
    const resumes = await Resume.find({ userId: req.user_id })
      .sort({ updatedAt: -1 })
      .select("-__v");
    res.json(resumes);
  } catch (error) {
    console.error("Get resumes error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Get a single resume
router.get("/:id", isAuthenticated, async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      userId: req.user_id,
    });

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    res.json(resume);
  } catch (error) {
    console.error("Get resume error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Create a new resume
router.post("/", isAuthenticated, async (req, res) => {
  try {
    const { title, personal_info, professional_summary, experience, education, projects, skills, template, accent_color, public: isPublic } = req.body;

    const resume = await Resume.create({
      userId: req.user_id,
      title: title || "Untitled Resume",
      personal_info: personal_info || {},
      professional_summary: professional_summary || "",
      experience: experience || [],
      education: education || [],
      projects: projects || [],
      skills: skills || [],
      template: template || "modern",
      accent_color: accent_color || "#038079",
      public: isPublic || false,
    });

    res.status(201).json(resume);
  } catch (error) {
    console.error("Create resume error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Update a resume
router.put("/:id", isAuthenticated, async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      userId: req.user_id,
    });

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    const {
      title,
      personal_info,
      professional_summary,
      experience,
      education,
      projects,
      skills,
      template,
      accent_color,
      public: isPublic,
    } = req.body;

    // Update only provided fields
    if (title !== undefined) resume.title = title;
    if (personal_info !== undefined) resume.personal_info = personal_info;
    if (professional_summary !== undefined) resume.professional_summary = professional_summary;
    if (experience !== undefined) resume.experience = experience;
    if (education !== undefined) resume.education = education;
    if (projects !== undefined) resume.projects = projects;
    if (skills !== undefined) resume.skills = skills;
    if (template !== undefined) resume.template = template;
    if (accent_color !== undefined) resume.accent_color = accent_color;
    if (isPublic !== undefined) resume.public = isPublic;

    await resume.save();

    res.json(resume);
  } catch (error) {
    console.error("Update resume error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Delete a resume
router.delete("/:id", isAuthenticated, async (req, res) => {
  try {
    const resume = await Resume.findOneAndDelete({
      _id: req.params.id,
      userId: req.user_id,
    });

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    res.json({ message: "Resume deleted successfully" });
  } catch (error) {
    console.error("Delete resume error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Get public resume (for sharing)
router.get("/public/:id", async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      public: true,
    }).select("-userId -__v");

    if (!resume) {
      return res.status(404).json({ message: "Resume not found or not public" });
    }

    res.json(resume);
  } catch (error) {
    console.error("Get public resume error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});



import { GoogleGenerativeAI } from "@google/generative-ai";

// AI Helper Function for PDF Extraction
const extractResumeData = async (text) => {
  if (!process.env.GEMINI_API_KEY) {
    console.log("No Gemini API Key found for extraction. Returning basic text.");
    return { professional_summary: text };
  }

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const modelName = process.env.GEMINI_MODEL || "gemini-2.5-flash";

  const prompt = `
    You are an expert ATS resume parser. Extract the following information from the provided resume text and return it as a structured JSON object.

    Follow this EXACT JSON format (return ONLY valid JSON, no markdown formatting like \`\`\`json):
    {
      "personal_info": {
        "fullname": "",
        "profession": "",
        "email": "",
        "phone": "",
        "location": "",
        "linkedin": "",
        "website": ""
      },
      "professional_summary": "",
      "experience": [
        {
          "company": "",
          "position": "",
          "start_date": "",
          "end_date": "",
          "description": ""
        }
      ],
      "education": [
        {
          "degree": "",
          "institution": "",
          "start_date": "",
          "end_date": "",
          "description": ""
        }
      ],
      "projects": [
        {
          "name": "",
          "description": "",
          "technologies": "",
          "link": "",
          "start_date": "",
          "end_date": ""
        }
      ],
      "skills": ["<skill1>", "<skill2>"]
    }

    Guidelines:
    - If a field is not found, leave it as an empty string "" or empty array [].
    - For dates, use format like 'YYYY-MM' if possible, or just the year 'YYYY'.
    - For experience descriptions, combine bullet points into a single text block separated by newlines.
    - Extract as accurately as possible.

    Resume Text to Extract:
    ${text}
  `;

  try {
    const model = genAI.getGenerativeModel({ model: modelName });
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    // Clean up potential markdown formatting in the response
    const jsonString = responseText.replace(/```json/gi, '').replace(/```/g, '').trim();
    
    return JSON.parse(jsonString);
  } catch (error) {
    console.error("Gemini Extraction Error:", error);
    // Fallback to purely pushing text to summary if extraction fails
    return { professional_summary: text };
  }
};



//upload pdf resume

router.post("/uploads", isAuthenticated, upload.single("resume"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const filePath = req.file.path;
      const dataBuffer = fs.readFileSync(filePath);

      const pdfData = await PdfParse(dataBuffer);
      const extractedText = pdfData.text || "";



      console.log("Extracting structured data from PDF text...");

      // Pass extracted raw text to AI for structured JSON conversion
      const extractedData = await extractResumeData(extractedText);


      const resume = await Resume.create({
        userId: req.user_id,
        title: req.body.title || (extractedData?.personal_info?.fullname ? `${extractedData.personal_info.fullname}'s Resume` : "Upload Resume"),
        fileUrl: `/uploads/${req.file.filename}`,
        personal_info: extractedData.personal_info || {},
        professional_summary: extractedData.professional_summary || "",
        experience: extractedData.experience || [],
        education: extractedData.education || [],
        projects: extractedData.projects || [],
        skills: extractedData.skills || [],
        template: "modern",
        accent_color: "#038079",
        public: false,
      });
      res.status(201).json(resume);
    } catch (error) {
      console.error("upload error:", error);
      res.status(500).json({ message: "Upload failed" });
    }
  });

export default router;

