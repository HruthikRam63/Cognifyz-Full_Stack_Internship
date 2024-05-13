import React, { useState } from 'react'; // Import React and useState hook
import axios from 'axios'; // Import axios for making HTTP requests
import './Feedback-form.css'; // Import custom CSS for styling
import logoImage from '../src/assets/cognifyz-1.png'; // Import logo image

function FeedbackForm() {
    const [feedbackId, setFeedbackId] = useState(''); // State variable for feedback ID
    const [fullName, setFullName] = useState(''); // State variable for full name
    const [content, setContent] = useState(''); // State variable for feedback content
    const [submitting, setSubmitting] = useState(false); // State variable for submission status
    const [showSubmittedMessage, setShowSubmittedMessage] = useState(false); // State variable for showing submitted message
    const [showErrorMessage, setShowErrorMessage] = useState(false); // State variable for showing error message

    const handleSubmit = async (e) => { // Function to handle form submission
        e.preventDefault(); // Prevent default form submission behavior

        if (submitting) return; // If already submitting, return

        setSubmitting(true); // Set submitting status to true

        try {
            const response = await axios.post('http://localhost:3000/api/feedback-form', { feedbackId, fullName, content }); // Submit feedback via API
            console.log('Feedback submitted:', response.data); // Log success message
            setShowSubmittedMessage(true); // Show submitted message
            setFeedbackId(''); // Clear feedback ID field
            setFullName(''); // Clear full name field
            setContent(''); // Clear content field
            setShowErrorMessage(false); // Hide error message
        } catch (error) {
            console.error('Failed to submit feedback:', error); // Log error message
            setShowErrorMessage(true); // Show error message
        } finally {
            setSubmitting(false); // Set submitting status to false
        }
    };

    const handleCloseMessage = () => { // Function to handle closing messages
        setShowSubmittedMessage(false); // Hide submitted message
        setShowErrorMessage(false); // Hide error message
    };

    return (
        <div className="feedback-form-container"> {/* Container for feedback form */}
            {!showSubmittedMessage && !showErrorMessage && ( // Conditionally render form if neither submitted nor error message is shown
                <div>
                    <div className="logo-container"> {/* Container for logo */}
                        <img src={logoImage} alt="Company Logo" className="logo-image" /> {/* Logo image */}
                    </div>
                    <h2>Internship Feedback</h2> {/* Heading */}
                    <form onSubmit={handleSubmit}> {/* Form */}
                        <div>
                            <label htmlFor="feedbackId">Feedback Unique Id:</label> {/* Label for feedback ID input */}
                            <input
                                type="number"
                                id="feedbackId"
                                value={feedbackId}
                                onChange={(e) => setFeedbackId(e.target.value)}
                                required
                            /> {/* Feedback ID input */}
                        </div>
                        <div>
                            <label htmlFor="fullName">Full Name:</label> {/* Label for full name input */}
                            <input
                                type="text"
                                id="fullName"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                required
                            /> {/* Full name input */}
                        </div>
                        <div>
                            <label htmlFor="content">Content:</label> {/* Label for content textarea */}
                            <textarea
                                id="content"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                required
                            /> {/* Content textarea */}
                        </div>
                        <button type="submit" disabled={submitting}>
                            {submitting ? 'Submitting...' : 'Submit'}
                        </button> {/* Submit button */}
                    </form>
                </div>
            )}

            {showSubmittedMessage && ( // Show submitted message if state is true
                <div className="submitted-message"> {/* Container for submitted message */}
                    <p>Feedback submitted successfully!</p> {/* Success message */}
                    <button onClick={handleCloseMessage}>Close</button> {/* Close button */}
                </div>
            )}

            {showErrorMessage && ( // Show error message if state is true
                <div className="error-message"> {/* Container for error message */}
                    <p>Failed to submit feedback. Please try again.</p> {/* Error message */}
                    <button onClick={handleCloseMessage}>Close</button> {/* Close button */}
                </div>
            )}
        </div>
    );
}

export { FeedbackForm }; // Export FeedbackForm component
