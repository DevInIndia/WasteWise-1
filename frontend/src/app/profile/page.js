"use client"
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

const Page = () => {
    const { data: session, status } = useSession();
    const [loading, setLoading] = useState(true);

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
                <p>Welcome, {session.user.name} - you are logged in to the profile page</p>
            ) : (
                <p>You must be logged in to view this page - protected route</p>
            )}
        </div>
    );
};

export default Page;
