import { callClaude } from "./claudeService.js";

export async function runAgentToParse({resume}){
    const messages = [
        {
            role: "user",
            // content: `Task: ${task}\n Input: ${input}`
            content: `
                        Extract structured JSON from this resume:
                        ${resume}
                        Return:
                        {
                        "skills": [{"name":"string, "score":number}],
                        "experience": number,
                        "highlights": ["string"]
                        }
                        `
        }
    ]
    return await callClaude(messages);
}
export async function runAgentToMatch({job, resume}){
    const messages = [
        {
            role: "user",
            // content: `Task: ${task}\n Input: ${input}`
            content: `
                        Compare and analysis the resume and job requirement to find out how they are matched
                        Job position details:
                        ${job}
                        Resume details:
                        ${resume}
                        Return:
                        {
                        "match_score": number,
                        "breakdown":{
                            "skills": [{"name":"string, "score":number}],
                            "experience": number,
                        },
                        "highlights": ["string"],
                        "missing_skill": ["string"]
                        }
                        `
        }
    ]
    return await callClaude(messages);
}

async function callClaudeAgent(id, message){
    if(id == "parse_resume"){
        return await callClaude(message);
    }
}