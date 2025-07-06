import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { AIFeedback } from '../types';
import { PATENT_RULES, SCORING_RUBRIC } from '../constants';

if (!process.env.API_KEY) {
  console.error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

function buildPrompt(userClaim: string, originalClaim: string, novelty: string, inventiveStep: string): string {
  return `
You are an expert patent attorney examiner AI. Your task is to evaluate a user-drafted patent claim based on a provided invention scenario. You must provide a numerical score and detailed feedback. Your response MUST be a valid JSON object.

${SCORING_RUBRIC}

**Patent Law Rules for Structure (Reference):**
---
${PATENT_RULES}
---

**Invention Scenario:**
*   **Original/Ideal Claim (for your reference, do not show to user):** ${originalClaim}
*   **Novelty to Capture:** ${novelty}
*   **Inventive Step to Demonstrate:** ${inventiveStep}

**User's Drafted Claim:**
---
${userClaim}
---

**Your Task:**
Evaluate the "User's Drafted Claim" based on the criteria above. Provide your analysis in the following JSON format. Do not include any text, comments, or markdown formatting outside of the final JSON object.

{
  "score": <total_score_out_of_100>,
  "feedback": {
    "clarity": "<Your detailed analysis on clarity and structure. Point out specific phrases and suggest improvements.>",
    "novelty": "<Your detailed analysis on how well the user captured the novelty. Compare to the ideal claim's phrasing.>",
    "inventiveStep": "<Your detailed analysis on the inventive step. Explain if the claim successfully defines a non-obvious combination.>",
    "overall": "<Provide a final summary and actionable suggestions for the user to improve their claim drafting skills based on this exercise.>"
  }
}
`;
}

export async function getAIFeedback(
  userClaim: string,
  originalClaim: string,
  novelty: string,
  inventiveStep: string
): Promise<AIFeedback> {
  const prompt = buildPrompt(userClaim, originalClaim, novelty, inventiveStep);

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-04-17",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.3,
      }
    });

    let jsonStr = response.text.trim();
    
    // Clean potential markdown fences
    const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
    const match = jsonStr.match(fenceRegex);
    if (match && match[2]) {
      jsonStr = match[2].trim();
    }

    const parsedData: AIFeedback = JSON.parse(jsonStr);
    return parsedData;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to get a valid response from the AI model.");
  }
}
