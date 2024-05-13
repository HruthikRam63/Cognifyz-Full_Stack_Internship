const express = require('express'); // Import Express framework
const bodyParser = require('body-parser'); // Import body-parser middleware
const mongoose = require('mongoose'); // Import mongoose for MongoDB interaction
const cors = require('cors'); // Import CORS middleware

const app = express(); // Create Express app
const port = 3000; // Define port number for server

// CORS setup
const corsOptions = {
    origin: ['http://localhost:5173', 'http://localhost:5173/feedback-form'], // Allowed origins for CORS
    credentials: true, // Allow credentials
    optionSuccessStatus: 200 // Set success status for preflight requests
};
app.use(cors(corsOptions)); // Use CORS middleware with options

app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(bodyParser.json()); // Parse JSON bodies

mongoose.connect('mongodb+srv://mrjayant81:thisIsMyMongoDbPassword@cluster0.tyifqyc.mongodb.net/cognifyz-db', {
    // Connect to MongoDB Atlas cluster
});

// Mongoose model for Feedback collection
const feedbackSchema = new mongoose.Schema({
    feedbackId: Number, // Define feedbackId field in schema
    fullName: String, // Define fullName field in schema
    content: String, // Define content field in schema
});
const Feedback = mongoose.model('Feedback', feedbackSchema); // Create Feedback model

app.post('/api/feedback-form', async (req, res) => { // POST endpoint to handle feedback form submission
    const { feedbackId, fullName, content } = req.body; // Extract data from request body

    if (!feedbackId || !fullName || !content) { // Check if required fields are missing
        return res.status(400).json({ error: 'Full Name and Content and Feedback ID are required' }); // Respond with error if fields are missing
    }

    const feedbacksaveresponse = await Feedback.create( // Save feedback entry to database
        {
            feedbackId,
            fullName,
            content
        }
    )

    const createdFeedback = await Feedback.findById(feedbacksaveresponse._id); // Find created feedback entry

    if (!createdFeedback) { // Check if feedback creation failed
        return res.status(500).json({ error: 'Failed to create feedback' }); // Respond with error if creation failed
    }

    return res.status(201) // Respond with success status and created feedback
        .json({"created feedback": createdFeedback});
});

// GET endpoint to fetch all feedback entries
app.get('/api/feedbackCollection', (req, res) => {
    Feedback.find() // Retrieve all feedback entries
        .then((feedbackEntries) => {
            res.status(200).json(feedbackEntries); // Send feedback entries as JSON response
        })
        .catch((error) => {
            res.status(500).json({ error: 'Failed to fetch feedback' }); // Handle error if fetching failed
        });
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}`); // Log server start message
});
