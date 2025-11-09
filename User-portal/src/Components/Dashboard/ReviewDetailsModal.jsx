import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const ReviewDetailsModal = ({ review, onClose }) => {
  if (!review) return null;

  console.log("submissionId"+JSON.stringify(review))

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", duration: 0.4 }}
          className="relative bg-white dark:bg-gray-900 p-6 rounded-3xl shadow-2xl w-full max-w-3xl overflow-hidden"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-600 hover:text-red-500 dark:text-gray-300 transition-colors"
          >
            <X size={24} />
          </button>

          {/* Title */}
          <h2 className="text-2xl font-bold text-blue-800 dark:text-blue-400 mb-5 text-center">
            Review Details
          </h2>

          {/* Review Info */}
          <div className="grid sm:grid-cols-2 gap-4 text-gray-800 dark:text-gray-300">
            <p>
              <strong>Submission ID:</strong> {review.submissionId || "N/A"}
            </p>
            <p>
              <strong>Postal Code:</strong> {review.PostalCode || "N/A"}
            </p>
            <p>
              <strong>Observations:</strong> {review.Observations || "N/A"}
            </p>
            <p>
              <strong>Points Earned:</strong> {review.Points || "N/A"}
            </p>
            <p className="sm:col-span-2">
              <strong>Created On:</strong> {review.CreatedOn || "N/A"}
            </p>
          </div>

          {/* Uploaded Images Section */}
          {review.Binaries?.length > 0 && (
            <div className="mt-6">
              <h3 className="font-semibold text-lg text-blue-700 dark:text-blue-300 mb-3">
                Uploaded Images
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {review.Binaries.map((img, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.05 }}
                    className="relative group rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                  >
                    <img
                      src={`data:image/jpeg;base64,${img.data}`}
                      alt={`Review Image ${idx + 1}`}
                      className="w-full h-40 object-contain"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <span className="text-white text-sm font-medium">
                        Image {idx + 1}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ReviewDetailsModal;
