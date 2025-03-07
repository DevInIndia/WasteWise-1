"use client"
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { ArrowBigUp, ArrowBigDown, MessageSquare, Share2 } from 'lucide-react';

export default function Community() {
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('new'); // 'new', 'top', 'hot'
  const [expandedPost, setExpandedPost] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, [sortBy]);

  const fetchPosts = async () => {
    try {
      const response = await fetch(`/api/communityPosts?sortBy=${sortBy}`);
      if (!response.ok) throw new Error("Failed to fetch posts");
  
      const fetchedPosts = await response.json();
      setPosts(fetchedPosts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleVote = async (postId, isUpvote) => {
    if (!session) {
      alert("Please sign in to vote");
      return;
    }
  
    try {
      const post = posts.find(p => p.id === postId);
      const userEmail = session.user.email;
      
      // Check if user is trying to vote the same way again
      if (isUpvote && post.upvotes?.includes(userEmail) || 
          !isUpvote && post.downvotes?.includes(userEmail)) {
        // This is a vote cancellation
      } else if (isUpvote && post.downvotes?.includes(userEmail) ||
                 !isUpvote && post.upvotes?.includes(userEmail)) {
        // This is a vote switch
      }
  
      const response = await fetch("/api/communityPosts/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId, userEmail, isUpvote }),
      });
  
      const { data } = await response.json();
      if (!response.ok) throw new Error(data.error);
  
      // Update the posts state with the exact data from the server
      setPosts(prevPosts =>
        prevPosts.map(post =>
          post.id === postId
            ? {
                ...post,
                upvotes: data.upvotes,
                downvotes: data.downvotes,
                voteCount: data.voteCount
              }
            : post
        )
      );
    } catch (error) {
      console.error("Error voting:", error);
      alert("Failed to update vote");
    }
  };

  // Helper function to safely format dates
  const formatDate = (dateValue) => {
    if (!dateValue) return "";
    
    try {
      // Handle Firestore timestamp objects
      if (dateValue && typeof dateValue.toDate === 'function') {
        return new Date(dateValue.toDate()).toLocaleDateString();
      }
      
      // Handle string dates or timestamps
      return new Date(dateValue).toLocaleDateString();
    } catch (error) {
      console.error("Date formatting error:", error);
      return "";
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Sort Controls */}
      <div className="flex space-x-4 mb-6">
        <button onClick={() => setSortBy('new')} className={`px-4 py-2 rounded-full ${sortBy === 'new' ? 'bg-darkGreen text-white' : 'bg-gray-200'}`}>New</button>
        <button onClick={() => setSortBy('top')} className={`px-4 py-2 rounded-full ${sortBy === 'top' ? 'bg-darkGreen text-white' : 'bg-gray-200'}`}>Top</button>
        <button onClick={() => setSortBy('hot')} className={`px-4 py-2 rounded-full ${sortBy === 'hot' ? 'bg-darkGreen text-white' : 'bg-gray-200'}`}>Hot</button>
      </div>

      {/* Posts */}
      <div className="space-y-4">
        {loading ? (
          [...Array(5)].map((_, i) => (
            <div key={i} className="animate-pulse bg-white rounded-lg p-4 shadow">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))
        ) : (
          posts.map(post => (
            <div key={post.id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setExpandedPost(expandedPost === post.id ? null : post.id)}>
              <div className="flex p-4">
                <div className="flex flex-col items-center p-2 bg-gray-50 rounded-l-lg">
                  <button onClick={(e) => { e.stopPropagation(); handleVote(post.id, true); }} className={`p-1 rounded ${post.upvotes?.includes(session?.user?.email) ? 'text-darkGreen' : ''}`}>
                    <ArrowBigUp />
                  </button>
                  <span className="my-1 font-bold">{post.voteCount || 0}</span>
                  <button onClick={(e) => { e.stopPropagation(); handleVote(post.id, false); }} className={`p-1 rounded ${post.downvotes?.includes(session?.user?.email) ? 'text-orange-500' : ''}`}>
                    <ArrowBigDown />
                  </button>
                </div>
                <div className="flex-1 p-2">
                  <div className="flex items-center mb-2">
                    {/* User Profile Icon - Using default avatar if image is missing or broken */}
                    <div className="w-8 h-8 rounded-full bg-gray-200 mr-2 flex items-center justify-center overflow-hidden">
                      {post.userImage ? (
                        <img 
                          src={post.userImage} 
                          alt={`${post.userName || 'User'}'s profile`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null; 
                            e.target.style.display = 'none'; 
                            e.target.parentNode.innerHTML = `<span className="text-gray-600 text-xs">${post.userName ? post.userName.charAt(0).toUpperCase() : 'U'}</span>`;
                          }}
                        />
                      ) : (
                        <span className="text-gray-600 text-sm font-medium">
                          {post.userName ? post.userName.charAt(0).toUpperCase() : 'U'}
                        </span>
                      )}
                    </div>
                    <span className="text-sm text-gray-600">
                      {post.userName || 'Anonymous'} 
                      {formatDate(post.createdAt) ? ` • ${formatDate(post.createdAt)}` : ''}
                    </span>
                  </div>
                  <h2 className="text-lg font-semibold">{post.prompt}</h2>
                  {expandedPost === post.id && <p className="text-gray-600 mt-2">{post.result}</p>}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}