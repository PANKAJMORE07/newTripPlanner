// controllers/FeedbackController.js
const Feedback = require("../models/Feedback");

exports.submitFeedback = async (req, res) => {
  try {
    const { feedback, rating } = req.body;

    // Validate fields
    if (!feedback || !rating) {
      return res.status(400).json({ message: "Feedback and rating are required." });
    }

    // Create a new feedback entry
    const newFeedback = new Feedback({ feedback, rating });
    await newFeedback.save();

    // Respond with a success message
    return res.status(201).json({
      message: "Thank you for your feedback!",
      feedback: newFeedback,
    });
  } catch (error) {
    console.error("Error saving feedback:", error);
    return res.status(500).json({ message: "Failed to submit feedback." });
  }
};
