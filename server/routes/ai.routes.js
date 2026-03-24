
import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { isAuthenticated } from "../middleware/auth.middleware.js";

const router = express.Router();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY?.trim();
const DEFAULT_FALLBACK_MODELS = [
  "gemini-2.5-flash",
  "gemini-2.5-pro",
  "gemini-2.0-flash",
  "gemini-1.5-flash",
  "gemini-1.5-pro",
  "gemini-flash-latest",
];


console.log("Loaded Gemini key :",process.env.GEMINI_API_KEY);





const ENV_MODELS = process.env.GEMINI_MODELS
  ? process.env.GEMINI_MODELS.split(",").map((m) => m.trim()).filter(Boolean)
  : [];

const PRIMARY_MODEL = process.env.GEMINI_MODEL?.trim();
const FALLBACK_MODELS = Array.from(
  new Set([
    ...(PRIMARY_MODEL ? [PRIMARY_MODEL] : []),
    ...ENV_MODELS,
    ...DEFAULT_FALLBACK_MODELS,
  ]),
);

const isModelNotAvailableError = (error) => {
  const text = `${error?.message || ""}`.toLowerCase();
  const status = Number(error?.status);
  return (
    status === 404 ||
    text.includes("not found") ||
    text.includes("not supported for generatecontent") ||
    text.includes("models/")
  );
};

const isInvalidApiKeyError = (error) => {
  const text = `${error?.message || ""}`.toLowerCase();
  const status = Number(error?.status);
  return (
    status === 400 &&
    (text.includes("api_key_invalid") ||
      text.includes("api key not valid") ||
      text.includes("invalid api key"))
  );
};

const isAnyModelUnavailable = (error) => {
  const text = `${error?.message || ""}`.toLowerCase();
  return text.includes("models/") || text.includes("not supported for generatecontent");
};

const generateWithModelFallback = async (prompt) => {
  if (!GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is missing in server environment.");
  }

  const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
  let lastError = null;

  for (const modelName of FALLBACK_MODELS) {
    try {
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      lastError = error;
      if (!isModelNotAvailableError(error)) {
        throw error;
      }
    }
  }

  throw (
    lastError ||
    new Error(
      `No Gemini model is available for generateContent. Tried: ${FALLBACK_MODELS.join(
        ", ",
      )}`,
    )
  );
};


/* SUMMARY ENHANCEMENT */
router.post("/enhance-summary", isAuthenticated, async (req, res) => {
  try {
    const { currentSummary, experience, skills } = req.body;

    const prompt = `
     Rewrite the following resume summary to be ATS-friendly.

Requirements:
- Professional tone
- No first-person words
- 3-4 sentences maximum
- Clear, concise, and natural language
- Avoid exaggerated or overly dramatic wording
- Include relevant technical keywords
- Return ONLY the final summary
- Do NOT include any introduction sentence
- Do NOT use markdown formatting

Experience: ${JSON.stringify(experience || [])}
Skills: ${JSON.stringify(skills || [])}
Current Summary: ${currentSummary || "None"}
    `;

    const text = await generateWithModelFallback(prompt);

    res.json({ enhancedSummary: text });
  } catch (error) {
    console.error("Gemini Summary Error:", error);
    if (isInvalidApiKeyError(error)) {
      return res.status(401).json({
        message: "Invalid Gemini API key. Please update GEMINI_API_KEY.",
        details: error?.message,
      });
    }
    if (isModelNotAvailableError(error) || isAnyModelUnavailable(error)) {
      return res.status(503).json({
        message: "No supported Gemini model is currently available.",
        details: error?.message,
        triedModels: FALLBACK_MODELS,
      });
    }
    res
      .status(500)
      .json({ message: "AI summary enhancement failed", details: error?.message });
  }
});

/* EXPERIENCE ENHANCEMENT */
router.post("/enhance-experience", isAuthenticated, async (req, res) => {
  try {
    const { currentDescription, company, position } = req.body;

    const prompt = `
     Rewrite the following job experience into 4-6 ATS-friendly bullet points.

Requirements:
- Start each bullet with a strong action verb
- Include measurable impact when possible
- No first-person language
- Format bullets starting with "- "
- Return ONLY the bullet points
- Do NOT include any introduction sentence
- Do NOT use markdown formatting
- Do NOT use bold or italics
- Keep language natural and professional

Position: ${position || "Not specified"}
Company: ${company || "Not specified"}
Current Description: ${currentDescription || "None"}

`;

    const text = await generateWithModelFallback(prompt);
    res.json({ enhancedDescription: text });
  } catch (error) {
    console.error("Gemini Experience Error:", error);
    if (isInvalidApiKeyError(error)) {
      return res.status(401).json({
        message: "Invalid Gemini API key. Please update GEMINI_API_KEY.",
        details: error?.message,
      });
    }
    if (isModelNotAvailableError(error) || isAnyModelUnavailable(error)) {
      return res.status(503).json({
        message: "No supported Gemini model is currently available.",
        details: error?.message,
        triedModels: FALLBACK_MODELS,
      });
    }
    res
      .status(500)
      .json({ message: "AI experience enhancement failed", details: error?.message });
  }
});

/* PROJECT ENHANCEMENT */
router.post("/enhance-project", isAuthenticated, async (req, res) => {
  try {
    const { currentDescription, projectName, technologies } = req.body;

    const prompt = `
      Rewrite the following project description for a resume.
      Requirements:
      - 3-5 strong bullet points
      - ATS-friendly
      - Mention technologies naturally
      - Highlight impact
      - Format bullets starting with "- "
      Project Name: ${projectName || "Not specified"}
      Technologies: ${technologies || "Not specified"}
      Current Description: ${currentDescription || "None"}
    `;

    const text = await generateWithModelFallback(prompt);
    res.json({ enhancedProject: text });
  } catch (error) {
    console.error("Gemini Project Error:", error);
    if (isInvalidApiKeyError(error)) {
      return res.status(401).json({
        message: "Invalid Gemini API key. Please update GEMINI_API_KEY.",
        details: error?.message,
      });
    }
    if (isModelNotAvailableError(error) || isAnyModelUnavailable(error)) {
      return res.status(503).json({
        message: "No supported Gemini model is currently available.",
        details: error?.message,
        triedModels: FALLBACK_MODELS,
      });
    }
    res
      .status(500)
      .json({ message: "AI project enhancement failed", details: error?.message });
  }
});

export default router;