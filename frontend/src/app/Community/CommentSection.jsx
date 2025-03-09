// CommentSection.js
import { Send, Trash2 } from "lucide-react";
import { useState } from "react";
import { addComment, removeComment } from "./firebaseOperations";

const CommentSection = ({ post, session }) => {
const [commentText, setCommentText] = useState("");
return (
    <div className="mt-4 bg-white shadow-md rounded-lg p-4 border border-gray-200">
    <div className="flex items-center gap-2">
        <input
        type="text"
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-green-300"
        placeholder="Write a comment..."
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        />
        <button
        onClick={() => addComment(session, post.id, commentText, setCommentText)}
        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 flex items-center gap-1"
        >
        <Send size={16} /> Post
        </button>
    </div>

    <div className="mt-4 space-y-3">
        {post.comments?.map((comment, index) => (
        <div
            key={index}
            className="bg-gray-100 p-3 rounded-lg flex justify-between items-start border border-gray-300"
        >
            <div>
            <p className="font-semibold text-green-700">{comment.user}</p>
            <p className="text-gray-800">{comment.text}</p>
            <p className="text-xs text-gray-500 mt-1">
                {new Date(comment.createdAt).toLocaleString()}
            </p>
            </div>
            {session?.user?.name === comment.user && (
            <button
                onClick={() => removeComment(session, post.id, index)}
                className="text-red-500 hover:text-red-700"
            >
                <Trash2 size={18} />
            </button>
            )}
        </div>
        ))}
    </div>
    </div>
);
};

export default CommentSection;
