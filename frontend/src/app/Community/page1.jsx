// "use client";
// import { addDoc, collection, deleteDoc, doc, getDoc, onSnapshot, orderBy, query, serverTimestamp, updateDoc } from "firebase/firestore";
// import { Loader, MessageSquare, Send, ThumbsUp, Trash2 } from "lucide-react";
// import { useSession } from "next-auth/react";
// import { useEffect, useState } from "react";
// import { db } from "../firebaseConfig";

// const CommunityFeed = () => {
//   const { data: session } = useSession();
//   const [loading, setLoading] = useState(true);
//   const [posts, setPosts] = useState([]);
//   const [newPost, setNewPost] = useState("");
//   const [image, setImage] = useState(null);
//   const [commentText, setCommentText] = useState({});
//   const [visibleComments, setVisibleComments] = useState({});

//   useEffect(() => {
//     const postsRef = collection(db, "communityPosts");
//     const q = query(postsRef, orderBy("createdAt", "desc"));

//     const unsubscribe = onSnapshot(q, (snapshot) => {
//       setPosts(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
//       setLoading(false);
//     });
//     return () => unsubscribe();
//   }, []);

//   const handlePost = async () => {
//     if (!session) return alert("Please sign in to post");
//     if (!newPost.trim() && !image) return;

//     await addDoc(collection(db, "communityPosts"), {
//       user: session.user.name,
//       userImage: session.user.image,
//       result: newPost,
//       imageUrl: image,
//       createdAt: serverTimestamp(),
//       likes: [],
//       comments: [],
//     });
//     setNewPost("");
//     setImage(null);
//   };

//   const handleDelete = async (postId) => {
//     if (!session) return alert("Please sign in to delete posts");
//     await deleteDoc(doc(db, "communityPosts", postId));
//   };

//   const handleLike = async (postId) => {
//     if (!session) return alert("Please sign in to like posts");
//     const postRef = doc(db, "communityPosts", postId);
//     const postSnap = await getDoc(postRef);
//     if (!postSnap.exists()) return;

//     const post = postSnap.data();
//     let likes = new Set(post.likes || []);
//     if (likes.has(session.user.email)) {
//       likes.delete(session.user.email);
//     } else {
//       likes.add(session.user.email);
//     }

//     await updateDoc(postRef, { likes: [...likes] });
//   };

//   const handleComment = async (postId) => {
//     if (!session) return alert("Please sign in to comment");
//     if (!commentText[postId]?.trim()) return;

//     const postRef = doc(db, "communityPosts", postId);
//     const postSnap = await getDoc(postRef);
//     if (!postSnap.exists()) return;

//     const post = postSnap.data();
//     let comments = post.comments || [];
//     comments.push({ user: session.user.name, text: commentText[postId], createdAt: new Date().toISOString() });

//     await updateDoc(postRef, { comments });
//     setCommentText((prev) => ({ ...prev, [postId]: "" }));
//   };

//   const handleDeleteComment = async (postId, commentIndex) => {
//     if (!session) return alert("Please sign in to delete comments");
//     const postRef = doc(db, "communityPosts", postId);
//     const postSnap = await getDoc(postRef);
//     if (!postSnap.exists()) return;

//     const post = postSnap.data();
//     let comments = post.comments || [];

//     if (comments[commentIndex]?.user !== session.user.name) return alert("You can only delete your own comments");

//     comments.splice(commentIndex, 1);
//     await updateDoc(postRef, { comments });
//   };

//   const toggleComments = (postId) => {
//     setVisibleComments((prev) => ({ ...prev, [postId]: !prev[postId] }));
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col items-center px-4 py-6">
//       <div className="w-full max-w-3xl flex flex-col gap-6">
//         {session && (
//           <div className="bg-white shadow-lg rounded-xl p-6">
//             <div className="flex items-center gap-3">
//               <img src={session.user.image} alt="Profile" className="w-10 h-10 rounded-full" />
//               <textarea
//                 className="w-full p-3 border rounded-lg"
//                 placeholder="Start a post..."
//                 value={newPost}
//                 onChange={(e) => setNewPost(e.target.value)}
//               ></textarea>
//             </div>
//             <div className="flex justify-between mt-2">
//               <div className="flex items-center cursor-pointer">
//               </div>
//               <button
//                 className="bg-darkGreen text-white px-4 py-2 rounded-lg hover:bg-green-700"
//                 onClick={handlePost}
//               >
//                 Post
//               </button>
//             </div>
//           </div>
//         )}

//         {loading ? (
//           <Loader className="animate-spin text-darkGreen" size={32} />
//         ) : posts.length === 0 ? (
//           <p className="text-gray-600 text-center">No posts found.</p>
//         ) : (
//           posts.map(post => (
//             <div key={post.id} className="bg-white p-4 rounded-lg shadow-lg">
//               <div className="flex items-center gap-3">
//                 <img src={post.userImage} alt="Profile" className="w-10 h-10 rounded-full" />
//                 <div>
//                   <h3 className="font-bold">{post.user}{post.userName}</h3>
//                   <p className="text-sm text-gray-500">{new Date(post.createdAt?.seconds * 1000).toLocaleString()}</p>
//                   <div>
//                   {session?.user?.name === post.userName && (
//                   <button onClick={() => handleDelete(post.id)} className="ml-auto text-red-500 hover:text-red-700"><Trash2 size={16} /></button>
//                 )}
//                   </div>
//                 </div>
//                 {session?.user?.name === post.user && (
//                   <button onClick={() => handleDelete(post.id)} className="ml-auto text-red-500 hover:text-red-700"><Trash2 size={16} /></button>
//                 )}
//               </div>
//               <p className="mt-2">{post.prompt}</p>
//               <br />
//               <p className="mt-2">{post.result}</p>
//               <div className="flex gap-4 mt-3 text-gray-600">
//                 <button onClick={() => handleLike(post.id)} className="flex items-center gap-1"><ThumbsUp size={16} /> {post.likes?.length || 0} Likes</button>
//               </div>
//               <div className="mt-3">
//                 <input type="text" className="w-full p-2 border rounded-lg" placeholder="Write a comment..." value={commentText[post.id] || ""} onChange={(e) => setCommentText({ ...commentText, [post.id]: e.target.value })} />
//                 <button onClick={() => handleComment(post.id)} className="ml-2 mt-4 text-blue-500 hover:text-blue-700"><Send size={16} /></button>
//                 <button onClick={() => handleComment(post.id)} className="ml-2 text-blue-500 hover:text-blue-700"> Comment</button>
//                 <button onClick={() => toggleComments(post.id)} className="flex items-center gap-1">
//                   <MessageSquare size={16} /> {post.comments?.length || 0} Comments
//                 </button>
//               </div>
//               {visibleComments[post.id] && (
//                 <div className="mt-3">
//                   {post.comments?.map((comment, index) => (
//                     <div key={index} className="mt-2 bg-gray-100 p-2 rounded-lg flex justify-between items-center">
//                       <div>
//                         <p className="font-semibold">{comment.user}</p>
//                         <p>{comment.text}</p>
//                         <p className="text-xs text-gray-500">{new Date(comment.createdAt).toLocaleString()}</p>
//                       </div>
//                       {session?.user?.name === comment.user && (
//                         <button onClick={() => handleDeleteComment(post.id, index)} className="text-red-500 hover:text-red-700"><Trash2 size={16} /></button>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default CommunityFeed;
