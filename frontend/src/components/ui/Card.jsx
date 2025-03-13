import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Card = ({ id, imageUrl, prompt, result, createdAt }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const { data: session } = useSession();
  const [isSharing, setIsSharing] = useState(false);
  const date = new Date(createdAt.seconds * 1000);
  const formattedDate = date.toLocaleString();

  const shareToCommunity = async (e) => {
  e.stopPropagation();
  if (!session) {
    alert("Please sign in to share to community");
    return;
  }

  setIsSharing(true);
  try {
    const response = await fetch("/api/communityPosts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id,
        imageUrl,
        prompt,
        result,
        userEmail: session.user.email,
        userName: session.user.name,
        userImage: session.user.image,
      }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error);
    
    alert("Successfully shared!");
  } catch (error) {
    alert(error.message);
  } finally {
    setIsSharing(false);
  }
};

const deleteCard = async (e) => {
  e.stopPropagation();
  try {
    await fetch("/api/userPrompts", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    alert("Deleted successfully");
    setIsDeleted(true);
  } catch (error) {
    alert("Failed to delete card");
  }
};

  if (isDeleted) return null;

  return (
    <>
      {/* Overlay Blur Effect */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-md z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Expanded Card Modal */}
      {isOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-50 bg-black/60 backdrop-blur-md p-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          onClick={() => setIsOpen(false)}
        >
          <div
            className="relative bg-darkGreen dark:bg-darkGreen shadow-xl rounded-lg p-6 w-full max-w-lg max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 text-2xl text-white hover:text-gray-300 transition-all"
            >
              &times;
            </button>
            <h2 className="text-xl sm:text-2xl font-semibold text-white">
              {prompt || "No Title"}
            </h2>
            <p className="text-sm text-gray-400">{formattedDate}</p>
            <p className="text-sm text-gray-300 mt-2">{prompt}</p>
            <p className="text-gray-200 mt-2">{result}</p>
          </div>
        </motion.div>
      )}

      {/* Normal Card */}
      {!isDeleted && !isOpen && (
        <motion.div
          className="relative bg-lightGreen dark:bg-lightGreen shadow-lg p-6 pt-12 w-full max-w-xs sm:max-w-md cursor-pointer transition-all duration-300 flex flex-col justify-between rounded-lg"
          onClick={() => setIsOpen(true)}
          layout
        >
          {/* Adjusted Button Positioning - Moved Outside */}
          <div className="absolute -top-3 right-3 flex space-x-2">
            <button
              onClick={shareToCommunity}
              disabled={isSharing}
              className="bg-darkGreen text-white w-8 h-8 flex items-center justify-center 
              rounded-md shadow-md hover:scale-105 transition-transform 
              disabled:opacity-50 disabled:hover:scale-100"
            >
              {isSharing ? "..." : "+"}
            </button>
            <button
              onClick={deleteCard}
              className="bg-lime-600 text-white w-8 h-8 flex items-center justify-center rounded-md shadow-md hover:scale-105 transition-transform"
            >
              -
            </button>
          </div>

          <h2 className="text-lg sm:text-xl font-semibold text-darkGreen mt-2">
            {prompt || "No Title"}
          </h2>
          <p className="text-xs sm:text-sm text-darkGreen">{formattedDate}</p>

          {imageUrl &&
            typeof imageUrl === "string" &&
            imageUrl.startsWith("data:image") && (
              <img
                src={imageUrl}
                alt="Image"
                className="mt-2 w-full max-w-md rounded-md"
              />
            )}

          <p className="text-xs sm:text-sm text-darkGreen mt-1">{prompt}</p>
          <p className="text-darkGreen mt-2 text-xs sm:text-sm">
            {result.slice(0, 100)}...
          </p>

          <motion.div
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="text-xs sm:text-sm text-green-950 mt-2 font-medium"
          >
            Click to Expand
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default Card;
