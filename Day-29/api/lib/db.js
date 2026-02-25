const { MongoClient, ServerApiVersion } = require("mongodb");

let cachedClient = null;
let cachedDb = null;
async function connectToDatabase() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error(
      "Database connection failed: MONGODB_URI environment variable is missing."
    );
  }
  if (cachedClient && cachedDb) {
    return cachedDb;
  }
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });
  try {
    await client.connect();
    const db = client.db("zenith_blog");
    cachedClient = client;
    cachedDb = db;
    return db;
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    throw error;
  }
}
module.exports = { connectToDatabase };
