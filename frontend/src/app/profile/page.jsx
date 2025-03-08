"use client"
import CardList from '@/src/components/ui/CardList';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';


const Profile = () => {
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
          }
          const data = await response.json();
          setPrompts(data);
        } catch (error) {
          console.error('Error fetching prompts:', error);
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
