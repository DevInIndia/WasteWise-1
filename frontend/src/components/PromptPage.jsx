'use client';

import { useState, useRef } from 'react';
import ChatInput from './chat-input';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useSession } from 'next-auth/react';

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
if (!apiKey) {
  console.warn("NEXT_PUBLIC_GEMINI_API_KEY is not defined. AI functionality will be disabled.");
}

const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;
const model = genAI?.getGenerativeModel({
  model: "gemini-2.0-flash-exp",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
};

export default function PromptPage() {
  const { data: session } = useSession();
  const chatSession = useRef(null); // Use useRef instead of useState
  const [result, setResult] = useState(null);

  const handleSubmit = async (text, image) => {
    try {
      if (!genAI) {
        setResult("AI functionality is disabled. Please configure the API key.");
        return;
      }
  
      if (!chatSession.current) {
        chatSession.current = model.startChat({
          generationConfig,
          history: [
            {
              role: "user",
              parts: [{ text: "You are an expert assistant for WasteWise, specializing in waste categorization and disposal advice..." }]
            }
          ],
        });
      }
  
      let prompt = text;
      let imageUrl = null;
      if (image) {
        const imageData = await fileToGenerativePart(image);
        prompt = [imageData, text];
        imageUrl = imageData.inlineData.data;
      }
  
      const response = await chatSession.current.sendMessage(prompt);
      let responseText = response?.response?.text() || "No response received.";
      responseText = responseText.replace(/\*\*/g, "").replace(/\*/g, "");
  
      setResult(responseText);
  
      if (session) {
        const user = session.user;
  
        // Send data to API route instead of Firestore directly
        await fetch("/api/prompts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userEmail: user.email,
            prompt: text,
            result: responseText,
            imageUrl: imageUrl,
          }),
        });
  
        console.log("User data sent to API.");
      }
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
            <div className="bg-offWhite rounded-lg shadow-lg p-6 h-full max-h-[80vh] overflow-y-auto 
                            scrollbar-thin scrollbar-thumb-darkGreen scrollbar-track-gray-200">
              <h2 className="text-lg font-semibold mb-2">Result:</h2>
              <div className="pr-2 leading-relaxed">
                <p className="text whitespace-pre-wrap">{result}</p>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-darkGreen text-3xl font-bold text-center px-10">
              Your solutions to dispose of the waste will appear here.
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
