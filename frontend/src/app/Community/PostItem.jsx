// PostItem.js
import { MessageCircle, ThumbsUp, Trash2 } from "lucide-react";
import { useState } from "react";
import CommentSection from "./CommentSection";
import { deletePost, toggleLike } from "./firebaseOperations";

const PostItem = ({ post, session }) => {
const [visibleComments, setVisibleComments] = useState(false);

return (
    <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200">
    <div className="flex items-center gap-4">
        <img src={post.userImage} alt="Profile" className="w-12 h-12 rounded-full border border-gray-300" />
        <div>
        <h3 className="font-bold text-gray-800">{post.user}{post.userName}</h3>
          <p className="text-sm text-gray-500">{new Date(post.createdAt?.seconds * 1000).toLocaleString()}</p>
        </div>
        {session?.user?.name === post.user && <button onClick={() => deletePost(session, post.id)} className="ml-auto text-red-500 hover:text-red-700"><Trash2 size={18} /></button>}
        {session?.user?.name === post.userName && <button onClick={() => deletePost(session, post.id)} className="ml-auto text-red-500 hover:text-red-700"><Trash2 size={18} /></button>}
    </div>
    <p className="mt-3 text-gray-800 font-semibold">{post.prompt}</p>
    <p className="mt-3 text-gray-800">{post.result}</p>
    <br/>
    <hr/>
    <div className="flex gap-6 mt-4 text-gray-600 border-t pt-3">
        <button onClick={() => toggleLike(session, post.id)} className="flex items-center gap-2 hover:text-green-600"><ThumbsUp size={16} /> {post.likes?.length || 0} Likes</button>
        <button onClick={() => setVisibleComments(!visibleComments)} className="flex items-center gap-2 hover:text-blue-600"><MessageCircle size={18} /> ({post.comments?.length || 0}) Comments</button>
    </div>
    {visibleComments && <CommentSection post={post} session={session} />}
    </div>
);
};

export default PostItem;