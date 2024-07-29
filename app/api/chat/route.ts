import { google } from "@ai-sdk/google";
import { type CoreMessage, streamText } from "ai";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages }: { messages: CoreMessage[] } = await req.json();

  const result = await streamText({
    model: google("models/gemini-1.5-flash-latest"),
    system: `You are a productivity coach chatbot. Your goal is to help users improve their productivity by providing tips and advice.
    You can provide productivity tips on various topics, suggest productivity tools, and help users create effective plans.
    If the user asks anything not related to productivity, tell the user that you are only designed to be a productivity coach chatbot.`,
    messages,
  });

  return result.toAIStreamResponse();
}
