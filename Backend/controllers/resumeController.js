import { runAgentToParse } from '../services/ai/aiService.js';
import fs from "fs/promises";
import path from "path";

export const parseResume = async (req, res) => {
  const { resume } = req.body;
  console.log("Request body" + JSON.stringify(req.body));
  if(!resume || resume == ""){
    return res.status(404).json('No resume detail');
  }

  const fileName = `resume-original.txt`;
  const filePath = path.join('uploads', fileName);
  await fs.writeFile(filePath, resume, "utf-8");

  console.log('Body from http post: ' + JSON.stringify(req.body));

  const result = await runAgentToParse({
    // task: "parse_resume",
    resume: resume,
  });
 
  const fileParseName = `resume-parse.txt`;
  const fileParsePath = path.join('uploads', fileParseName);
  await fs.writeFile(fileParsePath, result, "utf-8");

  console.log("parse_resume result: ", result);
  res.json(result);
};

export const getLastResumeData = async (req, res) => {
  try {
    const resumeFileName = `resume-original.txt`;
    const resumeFilePath = path.join('uploads', resumeFileName);
    
    try {
      const resumeData = await fs.readFile(resumeFilePath, "utf-8");
      res.json({ resume: resumeData });
    } catch (err) {
      res.json({ resume: "" });
    }
  } catch (err) {
    console.error("Error reading last resume data:", err);
    res.status(500).json({ error: "Failed to read last resume data" });
  }
};

export const getLastParseResult = async (req, res) => {
  try {
    const resultFileName = `resume-parse.txt`;
    const resultFilePath = path.join('uploads', resultFileName);
    
    try {
      const parseResult = await fs.readFile(resultFilePath, "utf-8");
      res.json(JSON.parse(parseResult));
    } catch (err) {
      res.json({});
    }
  } catch (err) {
    console.error("Error reading last parse result:", err);
    res.status(500).json({ error: "Failed to read last parse result" });
  }
};