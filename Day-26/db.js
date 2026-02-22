const { MongoClient } = require("mongodb");

// Connection URI and client
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri, { serverSelectionTimeoutMS: 5000 });

// Connect and verify handshake
async function connect() {
  try {
    await client.connect();
    // Perform a ping to ensure handshake/communication with server
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
