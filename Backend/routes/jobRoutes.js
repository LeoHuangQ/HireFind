import express from "express";
import { compResume } from "../controllers/jobController.js";

const router = express.Router();

router.post("/matching", compResume);
export default router;