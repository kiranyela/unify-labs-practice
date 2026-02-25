const path = require('path');

// Dynamically resolve the .env file exactly one directory up from this specific file
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const express = require('express');
const cors = require('cors');
const { ObjectId } = require('mongodb');
const { connectToDatabase } = require('./lib/db');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static frontend files from the 'public' directory
app.use(express.static(path.join(__dirname, '../public')));

/**
 * GET /api/posts
 * Retrieves all blog posts, sorted by newest first.
 */
app.get('/api/posts', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection('posts');
    const posts = await collection.find({}).sort({ _id: -1 }).toArray();
    res.status(200).json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Internal server error while fetching posts.' });
  }
});

/**
 * POST /api/posts
 * Creates a new blog post. Includes manual payload validation.
 */
app.post('/api/posts', async (req, res) => {
  try {
    const { title, category, content } = req.body;

    if (!title || !category || !content) {
      return res.status(400).json({ error: 'Missing required fields: title, category, and content are mandatory.' });
    }

    const db = await connectToDatabase();
    const collection = db.collection('posts');

    const newPost = {
      title,
      category,
      content,
      createdAt: new Date()
    };

    const result = await collection.insertOne(newPost);
    res.status(201).json({ message: 'Post created successfully', postId: result.insertedId });
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ error: 'Internal server error while creating the post.' });
  }
});

/**
 * PATCH /api/posts/:id
 * Updates an existing blog post. Validates ObjectId and handles partial updates.
 */
app.patch('/api/posts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid post ID format.' });
    }

    delete updates._id;
    delete updates.createdAt;
    updates.updatedAt = new Date();

    const db = await connectToDatabase();
    const collection = db.collection('posts');

    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updates }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Post not found.' });
    }

    res.status(200).json({ message: 'Post updated successfully' });
  } catch (error) {
    console.error('Error updating post:', error);
    res.status(500).json({ error: 'Internal server error while updating the post.' });
  }
});

/**
 * DELETE /api/posts/:id
 * Removes a blog post from the database.
 */
app.delete('/api/posts/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid post ID format.' });
    }

    const db = await connectToDatabase();
    const collection = db.collection('posts');

    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Post not found.' });
    }

    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ error: 'Internal server error while deleting the post.' });
  }
});

// Fallback route: Redirect unhandled requests to the frontend (SPA-like behavior)
app.get(/(.*)/, (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Start the traditional Node.js server
app.listen(PORT, async () => {
  console.log(`Server is running locally on http://localhost:${PORT}`);
  try {
    // Eagerly connect to the database on startup to verify credentials
    await connectToDatabase();
    console.log('Successfully connected to MongoDB Atlas.');
  } catch (error) {
    console.error('Database connection failed on startup:', error);
  }
});