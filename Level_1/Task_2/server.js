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
    res.render('index');
});

// Form submission route with server-side validation
app.post('/submit', (req, res) => {
    const { name, email } = req.body;
    // Server-side validation
    if (!name.trim() || !validateEmail(email)) {
        res.status(400).send('Invalid data'); // Send error response
    } else {
        // Store validated data in temporary server-side storage (in-memory)
        // Here you can store the data in a database or any other permanent storage
        // For now, let's just log the data
        console.log(`Validated Data - Name: ${name}, Email: ${email}`);
        res.send('Form submitted successfully'); // Send success response
    }
});

// Email validation function
function validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
}

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
