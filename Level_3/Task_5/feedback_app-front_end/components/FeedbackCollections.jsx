import React, { useState, useEffect } from 'react'; // Import React and necessary hooks
import axios from 'axios'; // Import axios for making HTTP requests
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './Feedback-collection.css'; // Import custom CSS for styling

function FeedbackCollections() {
    const [feedbackEntries, setFeedbackEntries] = useState([]); // State variable to store feedback entries

    useEffect(() => {
        const fetchFeedbackEntries = async () => { // Asynchronous function to fetch feedback entries
            try {
                const response = await axios.get('http://localhost:3000/api/feedbackCollection'); // Fetch feedback entries from API
                setFeedbackEntries(response.data); // Set feedback entries from API response
            } catch (error) {
                console.error('Failed to fetch feedback entries:', error); // Log error if fetching fails
            }
        };

        fetchFeedbackEntries(); // Call function to fetch feedback entries
    }, []); // Run effect only once on component mount

    return (
        <div className="feedback-collections"> {/* Container for feedback collections */}
            <h2>Feedback Collections</h2> {/* Heading for feedback collections */}
            <div className="card-container"> {/* Container for displaying feedback cards */}
                {feedbackEntries.length > 0 ? ( // Check if there are feedback entries
                    feedbackEntries.map((entry) => ( // Map through feedback entries and display cards
                        <div className="card" key={entry._id}> {/* Individual feedback card */}
                            <p><strong>ID:</strong> {entry._id}</p> {/* Display feedback ID */}
                            <p><strong>Full Name:</strong> {entry.fullName}</p> {/* Display full name */}
                            <p><strong>Content:</strong> {entry.content}</p> {/* Display feedback content */}
                            {entry.feedbackId && ( // Check if feedback ID exists
                                <p><strong>Feedback ID:</strong> {entry.feedbackId}</p> // Display feedback ID if available
                            )}
                        </div>
                    ))
                ) : (
                    <p>No feedback entries available</p> // Display message if no feedback entries found
                )}
            </div>
            <Link to="/feedback-form" className="button"> {/* Link to feedback form */}
                Provide Feedback {/* Button text */}
            </Link>
        </div>
    );
}

export default FeedbackCollections; // Export FeedbackCollections component
