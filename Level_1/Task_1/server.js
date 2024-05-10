const express = require('express');
const app = express();
const port = 3000;

app.set('views', __dirname + '/views');

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Set up routes
app.get('/', (req, res) => {
    res.render('index');
});

app.post('/submit', (req, res) => {
    const { name, email } = req.body;
    res.send(`<h1>Form submitted successfully!</h1><br />Received form data: <ul> <li>Name - ${name}</li> <li> Email - ${email}</li></ul>`);
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
