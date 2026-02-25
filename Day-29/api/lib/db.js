const { MongoClient, ServerApiVersion } = require('mongodb');

/**
 * @type {MongoClient}
 */
let cachedClient = null;

/**
 * @type {import('mongodb').Db}
 */
let cachedDb = null;

/**
 * Establishes or retrieves a cached connection to MongoDB Atlas.
 * Essential for Vercel serverless environments to prevent connection exhaustion.
 * * @returns {Promise<import('mongodb').Db>} The MongoDB database instance.
 * @throws {Error} If MONGODB_URI is undefined or connection fails.
 */
async function connectToDatabase() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error('Database connection failed: MONGODB_URI environment variable is missing.');
  }

  // Return cached connection if available
  if (cachedClient && cachedDb) {
    return cachedDb;
  }

  // Define strict API versioning for stability
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

  try {
    await client.connect();
    const db = client.db('zenith_blog'); 
    
    // Cache the connection
    cachedClient = client;
    cachedDb = db;
    
    return db;
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    throw error;
  }
}

module.exports = { connectToDatabase };