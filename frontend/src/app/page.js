"use client"
import "./globals.css";
import { useSession } from "next-auth/react";
import PromptPage from "../components/PromptPage";

export default function Home() {
  const { data: session } = useSession();

  return (
<<<<<<< HEAD
    <main className="p-4">
      <h1>WasteWise</h1>
      
=======
    <main>
      {session ? (
        <PromptPage/>
      ) : (
        <h1>WasteWise</h1>
      )}
>>>>>>> e1620bccd6b35fb656f4ee6e33f4c026c9ab37d0
    </main>
  );
}