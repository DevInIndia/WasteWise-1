// PostItem.js
import { ThumbsUp, Trash2 } from "lucide-react";
import { useState } from "react";
import CommentSection from "./CommentSection";
import { deletePost, toggleLike } from "./firebaseOperations";

const PostItem = ({ post, session }) => {
const [visibleComments, setVisibleComments] = useState(false);

return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
    <div className="flex items-center gap-3">
        <img src={post.userImage} alt="Profile" className="w-10 h-10 rounded-full" />
        <div>
        <h3 className="font-bold">{post.user}{post.userName}</h3>
          <p className="text-sm text-gray-500">{new Date(post.createdAt?.seconds * 1000).toLocaleString()}</p>
        </div>
        {session?.user?.name === post.user && <button onClick={() => deletePost(session, post.id)} className="ml-auto text-red-500 hover:text-red-700"><Trash2 size={16} /></button>}
        {session?.user?.name === post.userName && <button onClick={() => deletePost(session, post.id)} className="ml-auto text-red-500 hover:text-red-700"><Trash2 size={16} /></button>}
    </div>
    <p className="mt-2">{post.prompt}</p>
    <p className="mt-2">{post.result}</p>
    <br/>
    <hr/>
    <div className="flex gap-4 mt-3 text-gray-600">
        <button onClick={() => toggleLike(session, post.id)} className="flex items-center gap-1"><ThumbsUp size={16} /> {post.likes?.length || 0} Likes</button>
        <button onClick={() => setVisibleComments(!visibleComments)}>Comments ({post.comments?.length || 0})</button>
    </div>
    {visibleComments && <CommentSection post={post} session={session} />}
    </div>
);
};

export default PostItem;