import { MessageCircle, ThumbsUp, Trash2 } from "lucide-react";
import { useState } from "react";
import CommentSection from "./CommentSection";
import { deletePost, toggleLike } from "./firebaseOperations";

const PostItem = ({ post, session }) => {
  const [expanded, setExpanded] = useState(false);
  const [showComments, setShowComments] = useState(false); // Track comment section visibility
  const maxPreviewLength = 150; // Limit preview text

  return (
    <div
      className="bg-white shadow-md rounded-xl p-6 border border-gray-200 cursor-pointer transition hover:shadow-lg"
      onClick={(e) => {
        // Prevent collapsing when clicking inside the comment section
        if (!e.target.closest(".comment-section")) {
          setExpanded(!expanded);
        }
      }}
    >
      <div className="flex items-center gap-4">
        <img
          src={post.userImage}
          alt="Profile"
          className="w-12 h-12 rounded-full border border-gray-300"
        />
        <div>
          <h3 className="font-bold text-gray-800">{post.userName}{post.user}</h3>
          <p className="text-sm text-gray-500">
            {new Date(post.createdAt?.seconds * 1000).toLocaleString()}
          </p>
        </div>
        {(session?.user?.name === post.userName || session?.user?.name === post.user ) && (
          <button
            onClick={(e) => {
              e.stopPropagation(); // Prevent post from expanding when deleting
              deletePost(session, post.id);
            }}
            className="ml-auto text-darkGreen hover:text-red-700"
          >
            <Trash2 size={18} />
          </button>
        )}
      </div>

      {/* Post content preview */}
      <p className="mt-3 text-gray-800 font-semibold">
        {expanded
          ? post.prompt || "No content available"
          : post.prompt
          ? `${post.prompt.substring(0, maxPreviewLength)}...`
          : "No content available"}
      </p>

      {expanded && <p className="mt-3 text-gray-800">{post.result}</p>}

      <hr className="my-3" />

      <div className="flex gap-6 mt-4 text-gray-600 border-t pt-3">
        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevent expanding when clicking
            toggleLike(session, post.id);
          }}
          className="flex items-center gap-2 hover:text-green-600"
        >
          <ThumbsUp size={16} /> {post.likes?.length || 0} Likes
        </button>

        {/* Comment button toggles comment section visibility */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setExpanded(true); // Show full post when viewing comments
            setShowComments(!showComments); // Toggle only comments
          }}
          className="flex items-center gap-2 hover:text-blue-600"
        >
          <MessageCircle size={18} /> ({post.comments?.length || 0}) Comments
        </button>
      </div>

      {/* Comments only show when post is expanded and showComment is true */}
      {expanded && showComments && <CommentSection post={post} session={session} />}
    </div>
  );
};

export default PostItem;
