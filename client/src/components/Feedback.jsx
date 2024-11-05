import { X } from "lucide-react";
import { useState } from "react";
import PropTypes from "prop-types";
import { FaStar } from "react-icons/fa"; // Import star icon from react-icons

export default function Feedback({ isOpen, onClose }) {
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0); // Set initial rating to 0

  const handleSubmit = async (e) => {
    console.log("Submitting feedback");

    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3000/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          feedback,
          rating,
        }),
      });

      if (response.ok) {
        alert("Thank you for your feedback!");
        setFeedback("");
        setRating(0); // Reset rating to 0 after submission
        onClose();
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("Failed to submit feedback. Please try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="h-6 w-6" />
        </button>

        <h2 className="text-2xl font-bold mb-4">Share Your Feedback</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3 mr-96">
              Rating
            </label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setRating(value)}
                  className="focus:outline-none"
                >
                  <FaStar
                    size={30}
                    className={
                      rating >= value
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label style={{ marginRight: "18.5rem" }} className="block text-sm font-medium text-gray-700 mb-3">
              Your Feedback
            </label>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="w-full h-32 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Tell us what you think..."
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
          >
            Submit Feedback
          </button>
        </form>
      </div>
    </div>
  );
}

Feedback.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
