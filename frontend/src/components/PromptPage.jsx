'use client'

import { useState } from 'react';
import ChatInput from './chat-input';
import { GoogleGenerativeAI, ChatSession, GenerativeModel } from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
if (!apiKey) {
  throw new Error("NEXT_PUBLIC_GEMINI_API_KEY is not defined");
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
};

export default function PromptPage() {
  const [chatSession, setChatSession] = useState(null);
  const [result, setResult] = useState(null);

  const handleSubmit = async (text, image) => {
    try {
      let currentSession = chatSession;
      if (!currentSession) {
        currentSession = model.startChat({
          generationConfig,
          history: [
            {
              role: "user",
              parts: [
                {
                  text: `
  You are an expert assistant for WasteWise, specializing in waste categorization and disposal advice. Your role includes:
  1. Identifying the type of waste in the input (e.g., biodegradable or non-biodegradable).
  2. For non-biodegradable waste:
     - Determine if it can be disassembled.
     - Specify components that can be sold for profit, safely disposed of, or recycled.
     - Highlight safety precautions (e.g., batteries causing explosions or data extraction risks).
  3. For biodegradable waste:
     - Provide detailed instructions for composting and its benefits.
  4. Offer clear and specific cautions for handling or disposing of all waste items.
  
  Ensure your responses are accurate, detailed, and user-friendly.
  `
                }
              ]
            }
          ],
        });
        setChatSession(currentSession);
      }

      let prompt = text;
      if (image) {
        const imageData = await fileToGenerativePart(image);
        prompt = [imageData, text];
      }

      const response = await currentSession.sendMessage(prompt);
      let responseText = response.response.text();
      console.log("Raw AI Response:", responseText);

      responseText = responseText.replace(/\*\*/g, "").replace(/\*/g, "");

      console.log("Cleaned AI Response:", responseText);
      setResult(responseText);

    } catch (error) {
      console.error("Error processing input:", error);
      setResult("An error occurred while processing your request.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 p-6 flex flex-col items-center justify-center">
          <p className='text-5xl font-bold text-center px-10 py-10'>Waste Wise</p>
          <ChatInput onSubmit={handleSubmit} />
        </div>

        <div className="w-full md:w-1/2 p-6 bg-lightGreen relative">
            {result ? (
                <div className="bg-offWhite rounded-lg shadow-lg p-6 h-full max-h-screen overflow-y-auto 
                                scrollbar-thin scrollbar-thumb-darkGreen scrollbar-track-gray-200">
                <h2 className="text-lg font-semibold mb-2">Result:</h2>
                <div className="pr-2 leading-relaxed">
                    <p className="text whitespace-pre-wrap">{result}</p>
                </div>
                </div>
            ) : (
                <div className="flex items-center justify-center h-full text-darkGreen text-3xl font-bold text-center px-10">
                    Your solutions to dispose the waste will appear here.
                </div>
            )}
        </div>


      </main>
    </div>
  );
}

async function fileToGenerativePart(file) {
  const base64EncodedDataPromise = new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result.split(',')[1]);
    reader.readAsDataURL(file);
  });

  return {
    inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
  };
}
