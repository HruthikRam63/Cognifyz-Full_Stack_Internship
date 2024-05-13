import React from 'react'; // Import React library
import ReactDOM from 'react-dom/client'; // Import ReactDOM for rendering
import App from './App.jsx'; // Import the main App component
import './index.css'; // Import CSS file for styling
import { RouterProvider, createBrowserRouter, Route, createRoutesFromElements } from "react-router-dom"; // Import necessary components from react-router-dom
import { FeedbackForm } from "../components/FeedbackForm.jsx"; // Import FeedbackForm component
import FeedbackCollections from "../components/FeedbackCollections.jsx"; // Import FeedbackCollections component
import Layout from '../src/layout.jsx'; // Import Layout component

// Create browser router with defined routes
const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout/>}> {/* Root route with Layout component */}
            <Route path="" element={<FeedbackCollections/>}/> {/* Route for displaying feedback collections */}
            <Route path="/feedback-form" element={<FeedbackForm/>}/> {/* Route for feedback form */}
        </Route>
    )
);

// Render the app inside a root element
ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode> {/* Strict mode for improved error handling */}
        <RouterProvider router={router}/> {/* Provide router to the app */}
    </React.StrictMode>,
);
