"use client";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { Loader, MessageSquare, ThumbsUp } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { db } from "../firebaseConfig";

const Community = () => {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsRef = collection(db, "communityPosts");
        const querySnapshot = await getDocs(postsRef);
        setPosts(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
      setLoading(false);
    };
    fetchPosts();
  }, []);

  const handleCreatePost = async () => {
    if (!newPost.trim()) return;
    try {
      const post = {
        user: session?.user?.name || "Anonymous",
        content: newPost,
        timestamp: new Date(),
        profileImage: session?.user?.image || "",
      };
      await addDoc(collection(db, "communityPosts"), post);
      setPosts((prevPosts) => [post, ...prevPosts]);
      setNewPost("");
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center px-4 py-6 md:flex-row md:justify-center">
      <div className="w-full max-w-7xl flex flex-col gap-6 md:flex-row">
        <div className="flex-1 bg-white shadow-lg rounded-xl p-6 flex flex-col gap-6">
          <h2 className="text-darkGreen font-bold text-2xl">Community Feed</h2>
          <p className="text-gray-600">View groups and posts below.</p>

          {session && (
            <div className="bg-gray-100 p-4 rounded-lg shadow-md">
              <div className="flex gap-4 items-center">
                {session.user.image && (
                  <img src={session.user.image} alt="Profile" className="w-10 h-10 rounded-full" />
                )}
                <input
                  type="text"
                  className="flex-1 p-2 border rounded-lg"
                  placeholder="Share something..."
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                />
                <button className="bg-darkGreen text-white px-4 py-2 rounded-lg" onClick={handleCreatePost}>
                  Create a Post
                </button>
              </div>
              <div className="flex mt-2 gap-4">
                <button className="bg-gray-200 px-4 py-1 rounded">📷 Photo</button>
                <button className="bg-gray-200 px-4 py-1 rounded">📹 Video</button>
                <button className="bg-gray-200 px-4 py-1 rounded">🎞 GIF</button>
              </div>
            </div>
          )}

          {loading ? (
            <div className="flex justify-center items-center h-40">
              <Loader className="animate-spin text-darkGreen" size={32} />
            </div>
          ) : posts.length === 0 ? (
            <p className="text-gray-600 text-center">No posts found.</p>
          ) : (
            <div className="flex flex-col gap-4">
              {posts.map((post, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg shadow">
                  <div className="flex items-center gap-3">
                    {post.profileImage && (
                      <img src={post.profileImage} alt="Profile" className="w-8 h-8 rounded-full" />
                    )}
                    <div>
                      <h3 className="font-bold">{post.user}</h3>
                      <p className="text-sm text-gray-500">3 hours ago • posted in WasteWise Group</p>
                    </div>
                  </div>
                  <p className="mt-2">{post.content}</p>
                  <div className="flex gap-4 mt-3 text-gray-600">
                    <button className="flex items-center gap-1"><ThumbsUp size={16} /> 0</button>
                    <button className="flex items-center gap-1"><MessageSquare size={16} /> 0 Comments</button>
                  </div>
                  <input type="text" className="w-full mt-2 p-2 border rounded-lg" placeholder="Write a comment..." />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Community;
