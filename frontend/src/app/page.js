"use client"
import "./globals.css";
import { useSession } from "next-auth/react";
import PromptPage from "../components/PromptPage";

export default function Home() {
  const { data: session } = useSession();

  return (
    <main>
      {session ? (
        <PromptPage/>
      ) : (
        <h1>WasteWise</h1>
      )}
    </main>
  );
}