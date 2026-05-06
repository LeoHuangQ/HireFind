import { runAgentToMatch, runAgentToGenNew } from '../services/ai/aiService.js';
import fs from "fs/promises";
import path from "path";

export const compResume = async (req, res) => {
  const { job } = req.body;
  console.log('Body from http post: ' + JSON.stringify(req.body));

  if(!job || job == ""){
    return res.status(404).json('No job detail');
  }
  const jobInfoDesName = `job_info_des.txt`;
  const jobInfoDesNamePath = path.join('uploads', jobInfoDesName);
  await fs.writeFile(jobInfoDesNamePath, job, "utf-8");

  const fileName = `resume-original.txt`;
  const filePath = path.join('uploads', fileName);
  const resume = await fs.readFile(filePath, "utf-8");


  const result = await runAgentToMatch({
    // task: "match_resume",
    job: job,
    resume: resume,
  });
 
  const fileParseName = `resume-matching.txt`;
  const fileParsePath = path.join('uploads', fileParseName);
  await fs.writeFile(fileParsePath, result, "utf-8");

  console.log("parse_resume result: ", result);
  res.json(result);
};

export const generateNewResume = async (req, res) => {
  const { job } = req.body;
  console.log('Body from http post: ' + JSON.stringify(req.body));

  if(!job || job == ""){
    return res.status(404).json('No job detail');
  }
  const jobInfoDesName = `job_info_des.txt`;
  const jobInfoDesNamePath = path.join('uploads', jobInfoDesName);
  await fs.writeFile(jobInfoDesNamePath, job, "utf-8");
  
  const fileName = `resume-original.txt`;
  const filePath = path.join('uploads', fileName);
  const resume = await fs.readFile(filePath, "utf-8");

  const result = await runAgentToGenNew({
    job: job,
    resume: resume,
  });
 
  const fileNewName = `resume-generated.txt`;
  const fileNewPath = path.join('uploads', fileNewName);
  await fs.writeFile(fileNewPath, result, "utf-8");

  console.log("generate_new_resume result: ", result);
  res.json(result);
};

export const getLastJobData = async (req, res) => {
  try {
    const jobInfoDesName = `job_info_des.txt`;
    const jobInfoDesPath = path.join('uploads', jobInfoDesName);
    
    try {
      const jobData = await fs.readFile(jobInfoDesPath, "utf-8");
      res.json({ job: jobData });
    } catch (err) {
      res.json({ job: "" });
    }
  } catch (err) {
    console.error("Error reading last job data:", err);
    res.status(500).json({ error: "Failed to read last job data" });
  }
};

export const getLastMatchingResult = async (req, res) => {
  try {
    const resultFileName = `resume-matching.txt`;
    const resultFilePath = path.join('uploads', resultFileName);
    
    try {
      const matchingResult = await fs.readFile(resultFilePath, "utf-8");
      res.json(JSON.parse(matchingResult));
    } catch (err) {
      res.json({});
    }
  } catch (err) {
    console.error("Error reading last matching result:", err);
    res.status(500).json({ error: "Failed to read last matching result" });
  }
};