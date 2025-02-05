"use client"
import { arrayRemove, arrayUnion, collection, doc, getDocs, orderBy, query, updateDoc } from 'firebase/firestore';
import { ArrowBigDown, ArrowBigUp } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';

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
      let q;
      switch(sortBy) {
        case 'top':
          q = query(collection(db, "communityPosts"), orderBy("voteCount", "desc"));
          break;
        case 'hot':
          q = query(collection(db, "communityPosts"), orderBy("commentCount", "desc"));
          break;
        default: // 'new'
          q = query(collection(db, "communityPosts"), orderBy("createdAt", "desc"));
      }
      
      const snapshot = await getDocs(q);
      const fetchedPosts = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
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
      const postRef = doc(db, "communityPosts", postId);
      const post = posts.find(p => p.id === postId);
      const userEmail = session.user.email;

      if (post.upvotes?.includes(userEmail) && isUpvote) {
        await updateDoc(postRef, {
          upvotes: arrayRemove(userEmail),
          voteCount: (post.voteCount || 0) - 1
        });
      } else if (post.downvotes?.includes(userEmail) && !isUpvote) {
        await updateDoc(postRef, {
          downvotes: arrayRemove(userEmail),
          voteCount: (post.voteCount || 0) + 1
        });
      } else {
        await updateDoc(postRef, {
          [isUpvote ? 'upvotes' : 'downvotes']: arrayUnion(userEmail),
          [isUpvote ? 'downvotes' : 'upvotes']: arrayRemove(userEmail),
          voteCount: (post.voteCount || 0) + (isUpvote ? 1 : -1)
        });
      }
      
      fetchPosts();
    } catch (error) {
      console.error("Error voting:", error);
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
                  <button onClick={(e) => { e.stopPropagation(); handleVote(post.id, true); }} className={`p-1 rounded ${post.upvotes?.includes(session?.user?.email) ? 'text-orange-500' : ''}`}>
                    <ArrowBigUp />
                  </button>
                  <span className="my-1 font-bold">{post.voteCount || 0}</span>
                  <button onClick={(e) => { e.stopPropagation(); handleVote(post.id, false); }} className={`p-1 rounded ${post.downvotes?.includes(session?.user?.email) ? 'text-blue-500' : ''}`}>
                    <ArrowBigDown />
                  </button>
                </div>
                <div className="flex-1 p-2">
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
