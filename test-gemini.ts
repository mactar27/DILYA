import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { generateText } from 'ai';
import dotenv from 'dotenv';
dotenv.config();

async function main() {
  console.log("Testing Gemini API...");
  console.log("Key:", process.env.GOOGLE_GENERATIVE_AI_API_KEY?.substring(0, 10) + "...");
  
  try {
    const google = createGoogleGenerativeAI({
      apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
    });
    
    const result = await generateText({
      model: google('gemini-1.5-flash'),
      prompt: 'Dis bonjour',
    });
    
    console.log("Success! Response:");
    console.log(result.text);
  } catch (error: any) {
    console.error("FAILED!");
    console.error(error);
    if (error.cause) {
      console.error("Cause:", error.cause);
    }
  }
}

main();
