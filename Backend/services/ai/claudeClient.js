import Anthropic from "@anthropic-ai/sdk";

let claudeClientInstance = null;

export function getClaudeClient() {
  if (!claudeClientInstance) {
    claudeClientInstance = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY
    });
  }
  return claudeClientInstance;
}