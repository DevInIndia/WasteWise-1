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
      <div className="min-h-screen bg-gray-100 dark:bg-white-900 text-gray-900 dark:text-gray-100 p-6 flex flex-col items-center">
        <div className="w-full max-w-4xl bg-white dark:bg-white-00 shadow-md rounded-lg p-6">
        {loading ? (
          <p className="text-center text-lg font-medium">Loading...</p>
        ) : session ? (
          <>
          <p className='text-darkGreen font-extrabold text-3xl mb-4 text-center'>Disposal history:</p>
          {prompts.length === 0 ? (
            <p className='text-center text-gray-500'>No prompts found.</p>
          ) : (
            <CardList data={prompts} />
          )}
          </>
        ) : (
          <p className='text-center text-red-500 font-semibold'>You must be logged in to view this page - protected route</p>
        )}
      </div>
      </div>
    );
};

export default Profile;
