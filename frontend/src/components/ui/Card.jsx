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
        {/* Expanded Card Modal */}
          {isOpen && (
            <motion.div
              className="fixed inset-0 flex items-center justify-center z-50 bg-black/60 backdrop-blur-md p-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsOpen(false)} // Clicking outside closes modal
            >
              <div 
                className="relative bg-darkGreen dark:bg-darkGreen shadow-xl rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto 
                          scrollbar-thin scrollbar-thumb-darkGreen scrollbar-track-gray-200 scrollbar-thumb-css"
                onClick={(e) => e.stopPropagation()}
              >

                {/* Close Button */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-3 right-3 text-2xl text-white hover:text-gray-300 transition-all"
                >
                  &times;
                </button>

                {/* Title */}
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">{prompt || "No Title"}</h2>

                {/* Date */}
                <p className="text-sm text-gray-500 dark:text-gray-400">{formattedDate}</p>

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
          className="relative bg-lightGreen dark:bg-lightGreen shadow-lg p-5 w-full max-w-md cursor-pointer transition-all duration-300 flex flex-col justify-between"
          onClick={() => setIsOpen(true)}
          layout
        >
          {/* Title */}
          <h2 className="text-lg font-semibold text-darkGreen">{prompt || "No Title"}</h2>

          {/* Date */}
          <p className="text-sm text-darkGreen dark:text-darkGreen">{formattedDate}</p>

          {/* Image */}
          {imageUrl && typeof imageUrl === "string" && imageUrl.startsWith("data:image") && (
            <img src={imageUrl} alt="Image" className="mt-4 w-full max-w-md rounded-md" />
          )}

          {/* Prompt */}
          <p className="text-xs text-darkGreen dark:text-darkGreen mt-1">{prompt}</p>

          {/* AI Result (Preview Mode) */}
          <p className="text-darkGreen dark:text-darkGreen mt-2">
            {result.slice(0, 100)}... {/* Show only first 100 characters */}
          </p>

          {/* Expand/Collapse Indicator */}
          <motion.div
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="text-sm text-green-950 mt-2 font-medium"
          >
            Click to Expand
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default Card;
