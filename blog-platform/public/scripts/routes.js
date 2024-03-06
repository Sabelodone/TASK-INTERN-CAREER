// Signin route
app.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Query the database to retrieve user details
    const sql = 'SELECT * FROM users WHERE email = ?';
    db.query(sql, [email], async (err, result) => {
      if (err) {
        console.error('Error signing in:', err);
        return res.status(500).json({ error: 'An error occurred while signing in' });
      }
      if (result.length === 0) {
        console.log('User not found');
        return res.status(401).json({ error: 'Invalid email or password' });
      }
      // Compare passwords
      const user = result[0];
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        console.log('Invalid email or password');
        return res.status(401).json({ error: 'Invalid email or password' });
      }
      console.log('User signed in successfully');
      res.status(200).json({ message: 'User signed in successfully' });
    });
  } catch (error) {
    console.error('Error signing in:', error);
    res.status(500).json({ error: 'An error occurred while signing in' });
  }
});

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

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});