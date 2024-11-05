const express = require('express');
const FeedbackController = require('../controllers/feedbackController');
const { authenticateUser } = require('../middleware/auth');

const router = express.Router();

router.post("/feedback", authenticateUser, FeedbackController.submitFeedback);

module.exports = router; 