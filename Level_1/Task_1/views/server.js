const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Set path for views directory
app.set('views', path.join(__dirname, 'views'));

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Home route
app.get('/', (req, res) => {
    // Render the index view
    res.render('index');
});

// Form submission route
app.post('/submit', (req, res) => {
    // Extract name and email from the request body
    const { name, email } = req.body;
    
    // Here you can handle the form submission data
    console.log(`Name: ${name}, Email: ${email}`);
    
    // For now, let's just redirect back to the homepage
    res.redirect('/');
});

const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
