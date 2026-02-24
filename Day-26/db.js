const { MongoClient } = require("mongodb");

const DEFAULT_URI = "mongodb://localhost:27017";
const uri = process.env.MONGODB_URI || DEFAULT_URI;
const client = new MongoClient(uri, { serverSelectionTimeoutMS: 5000 });

async function connect() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Database connected successfully");
    const db = client.db("unify_labs");
    return { client, db };
  } catch (err) {
    console.error("Failed to connect to database:", err.message);
    throw err;
  }
}

module.exports = { connect };
