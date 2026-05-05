import { runAgentToMatch, runAgentToGenNew } from '../services/ai/aiService.js';
import fs from "fs/promises";
import path from "path";

export const compResume = async (req, res) => {
  const { job } = req.body;
  console.log('Body from http post: ' + JSON.stringify(req.body));

  if(!job || job == ""){
    return res.status(404).json('No job detail');
  }
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