// "use client";
// import { collection, getDocs } from "firebase/firestore";
// import { Loader, MessageSquare, ThumbsUp } from "lucide-react";
// import { useSession } from "next-auth/react";
// import { useEffect, useState } from "react";
// import { db } from "../firebaseConfig";

// const Community = () => {
//   const { data: session, status } = useSession();
//   const [loading, setLoading] = useState(true);
//   const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const postsRef = collection(db, "communityPosts");
//         const querySnapshot = await getDocs(postsRef);
//         setPosts(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
//       } catch (error) {
//         console.error("Error fetching posts:", error);
//       }
//       setLoading(false);
//     };
//     fetchPosts();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col items-center px-4 py-6 md:flex-row md:justify-center">
//       <div className="w-full max-w-7xl flex flex-col gap-6 md:flex-row">
//         <div className="flex-1 bg-white shadow-lg rounded-xl p-6 flex flex-col gap-6">
//           <h2 className="text-darkGreen font-bold text-2xl">Community Feed</h2>
//           <p className="text-gray-600">View posts below.</p>

//           {loading ? (
//             <div className="flex justify-center items-center h-40">
//               <Loader className="animate-spin text-darkGreen" size={32} />
//             </div>
//           ) : posts.length === 0 ? (
//             <p className="text-gray-600 text-center">No posts found.</p>
//           ) : (
//             <div className="flex flex-col gap-4">
//               {posts.map((post, index) => (
//                 <div key={index} className="bg-gray-50 p-4 rounded-lg shadow">
//                   <div className="flex items-center gap-3">
//                     {post.profileImage && (
//                       <img src={post.profileImage} alt="Profile" className="w-8 h-8 rounded-full" />
//                     )}
//                     <div>
//                       <h3 className="font-bold">{post.user}</h3>
//                       <p className="text-sm text-gray-500">{}</p>
//                     </div>
//                   </div>
//                   <p className="mt-2">{post.content}</p>
//                   <div className="flex gap-4 mt-3 text-gray-600">
//                     <button className="flex items-center gap-1"><ThumbsUp size={16} /> 0</button>
//                     <button className="flex items-center gap-1"><MessageSquare size={16} /> 0 Comments</button>
//                   </div>
//                   <input type="text" className="w-full mt-2 p-2 border rounded-lg" placeholder="Write a comment..." />
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Community;
