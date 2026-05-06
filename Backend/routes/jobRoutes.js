import express from "express";
import { compResume, generateNewResume, getLastJobData, getLastMatchingResult } from "../controllers/jobController.js";

const router = express.Router();

router.post("/matching", compResume);
router.post("/generate", generateNewResume);
router.get("/last-job", getLastJobData);
router.get("/last-matching", getLastMatchingResult);
export default router;