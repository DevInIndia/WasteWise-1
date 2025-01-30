"use client"
import "./globals.css";
import { useEffect, useState } from "react";
import { auth } from "./firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import PromptPage from "../components/PromptPage";
export default function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user); // Set user state if logged in, otherwise null
    });

    return () => unsubscribe(); // Cleanup subscription
  }, []);

  return (
    <main>
      {user ? (
        <PromptPage/>
      ) : (
        <h1>WasteWise</h1>
      )}
    </main>
  );
}
