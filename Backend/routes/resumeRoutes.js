import express from "express";
import { parseResume, getLastResumeData, getLastParseResult } from "../controllers/resumeController.js";

const router = express.Router();

router.post("/parse", parseResume);
router.get("/last-resume", getLastResumeData);
router.get("/last-parse", getLastParseResult);
export default router;