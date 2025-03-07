"use client"
import CardList from '@/src/components/ui/CardList';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';


const Profile = () => {
<<<<<<< HEAD
    const { data: session, status } = useSession();
    const [loading, setLoading] = useState(true);
    const [prompts,setPrompts]=useState([]);
    // Fetch user prompts from Firestore
    useEffect(() => {
      if (session?.user?.email) {
        const fetchPrompts = async () => {
          try {
            // Query the userPrompts collection and filter by user email
            const promptsRef = collection(db, "userPrompts");
            const q = query(promptsRef, where("userEmail", "==", session.user.email));
  
            const querySnapshot = await getDocs(q);
  
            if (querySnapshot.empty) {
              console.log("No prompts found.");
            } else {
              const userPrompts = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
              }));
  
              console.log("Fetched Prompts:", userPrompts);
              setPrompts(userPrompts);
            }
          } catch (error) {
            console.error("Error fetching prompts:", error);
=======
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  const [prompts, setPrompts] = useState([]);

  // Fetch user prompts from Firestore
  useEffect(() => {
    if (session?.user?.email) {
      const fetchPrompts = async () => {
        try {
          const response = await fetch(`/api/prompts?email=${session.user.email}`, {  // query parameter for email
            method: 'GET',
          });

          if (!response.ok) {
            throw new Error('Error fetching prompts');
>>>>>>> 3dfd0d23f41a5e1f9d7a35ddec10ad6a656019c3
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
      <div className='p-4'>
        {loading ? (
          <p>Loading...</p>
        ) : session ? (
          <>
          <p className='text-darkGreen font-extrabold text-2xl'>Disposal history:</p>
          {prompts.length === 0 ? (
            <p>No prompts found.</p>
          ) : (
            <CardList data={prompts} />
          )}
          </>
        ) : (
          <p>You must be logged in to view this page - protected route</p>
        )}
      </div>
    );
};

export default Profile;
