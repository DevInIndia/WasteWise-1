"use client";
import CardList from "@/src/components/ui/CardList";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Loader } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { db } from "../firebaseConfig";

const Profile = () => {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  const [prompts, setPrompts] = useState([]);

  useEffect(() => {
    if (session?.user?.email) {
      const fetchPrompts = async () => {
        try {
          const promptsRef = collection(db, "userPrompts");
          const q = query(promptsRef, where("userEmail", "==", session.user.email));
          const querySnapshot = await getDocs(q);
          if (!querySnapshot.empty) {
            setPrompts(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
          }
        } catch (error) {
          console.error("Error fetching prompts:", error);
        }
      };
      fetchPrompts();
    }
  }, [session]);

  useEffect(() => {
    const checkAuthentication = async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
      setLoading(false);
    };
    checkAuthentication();
  }, [session]);

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4">
      <div className="w-full max-w-5xl bg-white shadow-lg rounded-xl p-6 flex gap-6">

        <div className="w-1/3 bg-gray-100 p-6 rounded-lg shadow-md flex flex-col items-center">
          {session?.user?.image && (
            <img src={session.user.image} alt="Profile" className="w-24 h-24 rounded-full mb-4" />
          )}
          <h3 className="text-xl font-bold">{session?.user?.name || "User"}</h3>
          <div className="flex justify-between w-full mt-4">
            <div className="text-center">
              <p className="text-lg font-semibold">0</p>
              <p className="text-sm text-gray-500">Disposals</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-semibold">0</p>
              <p className="text-sm text-gray-500">Scans</p>
            </div>
          </div>
        </div>

        <div className="w-2/3">
          <h2 className="text-darkGreen font-bold text-2xl mb-4">Disposal History</h2>
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <Loader className="animate-spin text-darkGreen" size={32} />
            </div>
          ) : prompts.length === 0 ? (
            <p className="text-gray-600 text-center">No prompts found.</p>
          ) : (
            <div className="flex overflow-x-auto space-x-4">
              <CardList data={prompts} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
