import express from "express";
import { compResume, generateNewResume } from "../controllers/jobController.js";

const router = express.Router();

router.post("/matching", compResume);
router.post("/generate", generateNewResume);
export default router;