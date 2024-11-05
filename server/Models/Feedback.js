// models/Feedback.js
const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  feedback: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
});

module.exports = mongoose.model("Feedback", feedbackSchema);
