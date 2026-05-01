import { getClaudeClient } from "./claudeClient.js";
import { tools } from "../tools/index.js";

export async function callClaude(messages) {
  console.log('Received message: '+ JSON.stringify(messages));

  const claudeClient = getClaudeClient();
  const response = await claudeClient.messages.create({
    model: "claude-haiku-4-5",
    max_tokens: 1000,
    // tools: tools.map((t) => ({
    //   name: t.name,
    //   description: t.description,
    //   input_schema: t.input_schema,
    // })),
    messages: messages,
  });

  // console.log('Log for the clause client result'+ JSON.stringify(response));

  if(response && response.content && response.content.length > 0 && response.content[0].text){
    return response.content[0].text;
  }

  return response;
}
