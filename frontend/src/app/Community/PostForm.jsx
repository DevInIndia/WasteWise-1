// PostForm.js
import { useState } from "react";
import { createPost } from "./firebaseOperations";

const PostForm = ({ session }) => {
const [newPost, setNewPost] = useState("");
const [image, setImage] = useState(null);

return (
    <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200">
    <div className="flex items-center gap-3">
        <img src={session.user.image} alt="Profile" className="w-12 h-12 rounded-full border border-gray-300" />
        <textarea className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-green-300" placeholder="What's on your mind?" value={newPost} onChange={(e) => setNewPost(e.target.value)}></textarea>
    </div>
    <div className="mt-4 flex justify-end">
    <button className="bg-green-500 text-white px-5 py-2 rounded-lg hover:bg-green-600 flex items-center gap-2" onClick={() => createPost(session, newPost, image, setNewPost, setImage)}>Post</button>
    </div>
    </div>
);
};

export default PostForm;
