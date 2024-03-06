require('dotenv').config();

const path = require('path');

const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authMiddleware = require('./authMiddleware'); // Assuming you have authMiddleware defined in a separate file
const dbPassword = process.env.DB_PASSWORD;


const app = express();
const port = 3000;

// Database connection
const db = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: dbPassword,
  database: 'k1database',
  port: 3305
});

// Handle database connection errors
db.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to database:', err);
    process.exit(1); // Exit the application on connection error
  } else {
    console.log('Connected to MySQL database');
    connection.release(); // Release the connection
  }
});

// Middleware for parsing JSON data
app.use(bodyParser.json());

// Sign up (registration) route
app.post('/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create a new user
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'An error occurred while registering user' });
  }
});

// Sign in (login) route
app.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    // Verify the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    // Include the token in the response
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ error: 'An error occurred while logging in user' });
  }
});

// Protected route (example)
app.get('/protected', authMiddleware, (req, res) => {
  // Auth middleware ensures valid token before reaching here
  res.status(200).json({ message: 'Protected route accessed successfully' });
});

// ... (Other routes and server setup)



// Other routes and error handling...



// Submit blog post route
app.post('/submit', (req, res) => {
  const { title, author, content, image } = req.body;

  // Insert new blog post into the database
  const sql = 'INSERT INTO blog_posts (title, author, content, image) VALUES (?, ?, ?, ?)';
  db.query(sql, [title, author, content, image], (err, result) => {
    if (err) {
      console.error('Error submitting blog post:', err);
      return res.status(500).json({ error: 'An error occurred while submitting the blog post' });
    }
    console.log('Blog post submitted successfully');
    res.status(200).json({ message: 'Blog post submitted successfully' });
  });
});

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Define a route handler for the root path
app.get('/', (req, res) => {
  // Send the HTML content as the response
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Define a route to show tables
app.get('/show_tables', (req, res) => {
  // Query to fetch table names
  const sql = 'SHOW TABLES';
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error fetching tables:', err);
      return res.status(500).json({ error: 'An error occurred while fetching tables' });
    }
    // Extract table names from the result
    const tables = result.map(row => Object.values(row)[0]);
    // Check if the required tables exist
    if (!tables.includes('blog_posts') || !tables.includes('users')) {
      return res.status(404).json({ error: 'Required tables not found' });
    }
    // Send the response with table names
    res.status(200).json({ tables });
  });
});

// Define a route to fetch users
app.get('/users', (req, res) => {
  // Query to fetch users
  const sql = 'SELECT * FROM users';
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error fetching users:', err);
      return res.status(500).json({ error: 'An error occurred while fetching users' });
    }
    console.log('Users:', result);
    res.status(200).json({ users: result });
  });
});

// Create a new blog post
app.post('/posts', authMiddleware, async (req, res) => {
  try {
    const { title, content } = req.body;
    const userId = req.userData.userId;
    const newPost = new Post({ title, content, author: userId });
    await newPost.save();
    res.status(201).json({ message: 'Post created successfully' });
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ error: 'An error occurred while creating post' });
  }
});

// Get all blog posts
app.get('/posts', async (req, res) => {
  try {
    const posts = await Post.find().populate('author', 'username');
    res.status(200).json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'An error occurred while fetching posts' });
  }
});

// Update a blog post
app.put('/posts/:postId', authMiddleware, async (req, res) => {
  try {
    const postId = req.params.postId;
    const { title, content } = req.body;
    await Post.findByIdAndUpdate(postId, { title, content });
    res.status(200).json({ message: 'Post updated successfully' });
  } catch (error) {
    console.error('Error updating post:', error);
    res.status(500).json({ error: 'An error occurred while updating post' });
  }
});

// Delete a blog post
app.delete('/posts/:postId', authMiddleware, async (req, res) => {
  try {
    const postId = req.params.postId;
    await Post.findByIdAndDelete(postId);
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ error: 'An error occurred while deleting post' });
  }
});


// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});