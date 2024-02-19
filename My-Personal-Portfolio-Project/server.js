require('dotenv').config();

const emailPassword = process.env.EMAIL_PASSWORD;
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path'); // Import the 'path' module

const app = express();
// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Form submission route
app.post('/contact', (req, res) => {
    const { name, email, message } = req.body;

    // Create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        // Your SMTP configuration
        // Example using Gmail:
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD // Use the password retrieved from environment variables
        }
    });
    
    // Setup email data
    let mailOptions = {
        from: 'sabelozondo825@gmail.com',
        to: 'sabelozondo825@gmail.com', // Change to your email address
        subject: 'New message from your portfolio website',
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error occurred:', error);
            res.status(500).send('An error occurred while sending the message.');
        } else {
            console.log('Message sent:', info.response);
            res.status(200).send('Message sent successfully!');
        }
    });
});

// Default route handler
app.use((req, res) => {
    res.status(404).send('Page not found');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});