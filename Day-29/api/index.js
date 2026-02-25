const express = require("express");
const cors = require("cors");
const { ObjectId } = require("mongodb");
const { connectToDatabase } = require("./lib/db");

const app = express();

app.use(cors());
app.use(express.json());
app.get("/api/posts", async (req, res) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection("posts");
    const posts = await collection.find({}).sort({ _id: -1 }).toArray();
    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res
      .status(500)
      .json({ error: "Internal server error while fetching posts." });
  }
});
app.post("/api/posts", async (req, res) => {
  try {
    const { title, category, content } = req.body;
    if (!title || !category || !content) {
      return res
        .status(400)
        .json({
          error:
            "Missing required fields: title, category, and content are mandatory.",
        });
    }
    const db = await connectToDatabase();
    const collection = db.collection("posts");
    const newPost = { title, category, content, createdAt: new Date() };
    const result = await collection.insertOne(newPost);
    res
      .status(201)
      .json({
        message: "Post created successfully",
        postId: result.insertedId,
      });
  } catch (error) {
    console.error("Error creating post:", error);
    res
      .status(500)
      .json({ error: "Internal server error while creating the post." });
  }
});
app.patch("/api/posts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid post ID format." });
    }
    delete updates._id;
    delete updates.createdAt;
    updates.updatedAt = new Date();
    const db = await connectToDatabase();
    const collection = db.collection("posts");
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updates }
    );
    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Post not found." });
    }
    res.status(200).json({ message: "Post updated successfully" });
  } catch (error) {
    console.error("Error updating post:", error);
    res
      .status(500)
      .json({ error: "Internal server error while updating the post." });
  }
});
app.delete("/api/posts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid post ID format." });
    }
    const db = await connectToDatabase();
    const collection = db.collection("posts");
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Post not found." });
    }
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error);
    res
      .status(500)
      .json({ error: "Internal server error while deleting the post." });
  }
});
module.exports = app;
