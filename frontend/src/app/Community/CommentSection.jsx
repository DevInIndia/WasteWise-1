// CommentSection.js
import { Send, Trash2 } from "lucide-react";
import { useState } from "react";
import { addComment, removeComment } from "./firebaseOperations";

const CommentSection = ({ post, session }) => {
const [commentText, setCommentText] = useState("");
return (
    <div className="mt-3">
    <input type="text" className="w-full p-2 border rounded-lg" placeholder="Write a comment..." value={commentText} onChange={(e) => setCommentText(e.target.value)} />
    <button onClick={() => addComment(session, post.id, commentText, setCommentText)} className="ml-2 mt-2 text-blue-500 hover:text-blue-700"><Send size={16} /></button>
    <button onClick={() => addComment(session, post.id, commentText, setCommentText)} className="ml-1 text-blue-500 hover:text-blue-700">Comment</button>
    {post.comments?.map((comment, index) => (
        <div key={index} className="mt-2 bg-gray-100 p-2 rounded-lg flex justify-between items-center">
        <div>
            <p className="font-semibold">{comment.user}</p>
            <p>{comment.text}</p>
            <p className="text-xs text-gray-500">{new Date(comment.createdAt).toLocaleString()}</p>
        </div>
        {session?.user?.name === comment.user && <button onClick={() => removeComment(session, post.id, index)} className="text-red-500 hover:text-red-700"><Trash2 size={16} /></button>}
        </div>
    ))}
    </div>
);
};

export default CommentSection;
