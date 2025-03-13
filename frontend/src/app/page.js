"use client"
import "./globals.css";
import { useSession, signIn } from "next-auth/react";
import PromptPage from "../components/PromptPage";
import Link from "next/link";

export default function Home() {
  const { data: session } = useSession();

  return (
    <main>
      {session ? (
        <PromptPage />
      ) : (
        <div className="flex flex-col min-h-screen">
          {/* Hero Section */}
          <div className="bg-darkGreen flex-1 p-8">
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12 py-16">
              {/* Left side content */}
              <div className="md:w-1/2 text-white">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">MAKING WASTE DISPOSAL SMARTER AND EASY</h1>
                <p className="text-lg mb-8">Join our community to discover sustainable waste management solutions and contribute to a cleaner environment.</p>
                <div className="flex space-x-4">
                  <button onClick={() => signIn()} className="bg-white text-darkGreen px-6 py-3 rounded-md font-semibold hover:bg-offWhite">
                    Get Started
                  </button>
                  <Link href="/About" className="border-2 border-white text-white px-6 py-3 rounded-md font-semibold hover:bg-darkGreen/80">
                    Learn More
                  </Link>
                </div>
              </div>

              {/* Right side image/graphic */}
              <div className="md:w-1/2 flex justify-center">
                <div className="w-64 h-64 bg-white/10 rounded-full flex items-center justify-center">
                  <img src="/logo2.jpg" alt="WasteWise Logo" className="w-52 h-52 object-cover rounded-full shadow-lg" />

                </div>

              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="bg-offWhite py-16">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">How WasteWise Works</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-lightGreen p-6 rounded-lg">
                  <div className="w-12 h-12 bg-darkGreen rounded-full flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white">
                      <path d="M11.25 4.533A9.707 9.707 0 006 3a9.735 9.735 0 00-3.25.555.75.75 0 00-.5.707v14.25a.75.75 0 001 .707A8.237 8.237 0 016 18.75c1.995 0 3.823.707 5.25 1.886V4.533zM12.75 20.636A8.214 8.214 0 0118 18.75c.966 0 1.89.166 2.75.47a.75.75 0 001-.708V4.262a.75.75 0 00-.5-.707A9.735 9.735 0 0018 3a9.707 9.707 0 00-5.25 1.533v16.103z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">Learn</h3>
                  <p className="text-gray-600">Discover sustainable waste disposal methods and learn how to categorize your waste properly.</p>
                </div>

                <div className="bg-lightGreen p-6 rounded-lg">
                  <div className="w-12 h-12 bg-darkGreen rounded-full flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white">
                      <path d="M4.913 2.658c2.075-.27 4.19-.408 6.337-.408 2.147 0 4.262.139 6.337.408 1.922.25 3.291 1.861 3.405 3.727a4.403 4.403 0 00-1.032-.211 50.89 50.89 0 00-8.42 0c-2.358.196-4.04 2.19-4.04 4.434v4.286a4.47 4.47 0 002.433 3.984L7.28 21.53A.75.75 0 016 21v-4.03a48.527 48.527 0 01-1.087-.128C2.905 16.58 1.5 14.833 1.5 12.862V6.638c0-1.97 1.405-3.718 3.413-3.979z" />
                      <path d="M15.75 7.5c-1.376 0-2.739.057-4.086.169C10.124 7.797 9 9.103 9 10.609v4.285c0 1.507 1.128 2.814 2.67 2.94 1.243.102 2.5.157 3.768.165l2.782 2.781a.75.75 0 001.28-.53v-2.39l.33-.026c1.542-.125 2.67-1.433 2.67-2.94v-4.286c0-1.505-1.125-2.811-2.664-2.94A49.392 49.392 0 0015.75 7.5z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">Share</h3>
                  <p className="text-gray-600">Share your own waste management solutions and connect with like-minded individuals.</p>
                </div>

                <div className="bg-lightGreen p-6 rounded-lg">
                  <div className="w-12 h-12 bg-darkGreen rounded-full flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white">
                      <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">Implement</h3>
                  <p className="text-gray-600">Put the solutions into practice and track your contribution to a cleaner environment.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}