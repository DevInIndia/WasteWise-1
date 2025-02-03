import { motion } from "framer-motion";
import { useState } from "react";

const Card = ({ imageUrl, prompt, result, createdAt }) => {
  const [isOpen, setIsOpen] = useState(false);
  const date = new Date(createdAt.seconds * 1000);
  const formattedDate = date.toLocaleString();

  return (
    <>
      {/* Overlay Blur Effect when Open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-md z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Expanded Card Modal */}
      {isOpen && (
        <motion.div
          className="fixed inset-0 flex justify-center items-center z-50 overflow-y-auto"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="relative bg-darkGreen dark:bg-darkGreen shadow-xl rounded-lg p-6 w-full max-w-2xl h-auto overflow-auto">
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-white text-lg"
            >
              &times;
            </button>

            {/* Title */}
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">{prompt || "No Title"}</h2>

            {/* Date */}
            <p className="text-sm text-gray-500 dark:text-gray-400">{formattedDate}</p>

            {/* Image (if base64 encoded, render it) */}
            {imageUrl && typeof imageUrl === "string" && imageUrl.startsWith("data:image") && (
              <img src={imageUrl} alt="Expanded Image" className="mt-4 w-full max-w-full rounded-md" />
            )}

            {/* Prompt */}
            <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">{prompt}</p>

            {/* AI Result */}
            <p className="text-gray-700 dark:text-gray-200 mt-2">{result}</p>
          </div>
        </motion.div>
      )}

      {/* Normal Card */}
      {!isOpen && (
        <motion.div
          className="relative bg-darkGreen dark:bg-darkGreen shadow-lg p-5 w-full max-w-md cursor-pointer transition-all duration-300"
          onClick={() => setIsOpen(true)}
          layout
        >
          {/* Title */}
          <h2 className="text-lg font-semibold text-white">{prompt || "No Title"}</h2>

          {/* Date */}
          <p className="text-sm text-offWhite dark:text-offWhite">{formattedDate}</p>

          {/* Image */}
          {imageUrl && typeof imageUrl === "string" && imageUrl.startsWith("data:image") && (
            <img src={imageUrl} alt="Image" className="mt-4 w-full max-w-md rounded-md" />
          )}

          {/* Prompt */}
          <p className="text-xs text-gray-200 dark:text-gray-300 mt-1">{prompt}</p>

          {/* AI Result (Preview Mode) */}
          <p className="text-white dark:text-white mt-2">
            {result.slice(0, 100)}... {/* Show only first 100 characters */}
          </p>

          {/* Expand/Collapse Indicator */}
          <motion.div
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="text-sm text-teal-300 mt-2 font-medium"
          >
            Click to Expand
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default Card;
