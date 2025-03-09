// CommunityFeed.js
"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { fetchPosts } from "./firebaseOperations";
import PostForm from "./PostForm";
import PostItem from "./PostItem";

const CommunityFeed = () => {
    const { data: session } = useSession();
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
    const unsubscribe = fetchPosts(setPosts, setLoading);
    return () => unsubscribe();
    }, []);

    return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center px-4 py-6">
    <div className="w-full max-w-3xl flex flex-col gap-6">
        {session && <PostForm session={session} />}
        {loading ? <p>Loading...</p> : posts.length === 0 ? <p>No posts found.</p> : posts.map(post => <PostItem key={post.id} post={post} session={session} />)}
    </div>
    </div>
    );
};

export default CommunityFeed;