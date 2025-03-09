// PostForm.js
import { useState } from "react";
import { createPost } from "./firebaseOperations";

const PostForm = ({ session }) => {
const [newPost, setNewPost] = useState("");
const [image, setImage] = useState(null);

return (
    <div className="bg-white shadow-lg rounded-xl p-6">
    <div className="flex items-center gap-3">
        <img src={session.user.image} alt="Profile" className="w-10 h-10 rounded-full" />
        <textarea className="w-full p-3 border rounded-lg" placeholder="Start a post..." value={newPost} onChange={(e) => setNewPost(e.target.value)}></textarea>
    </div>
    <button className="ml-auto bg-darkGreen text-white px-4 py-2 rounded-lg hover:bg-green-700" onClick={() => createPost(session, newPost, image, setNewPost, setImage)}>Post</button>
    </div>
);
};

export default PostForm;
