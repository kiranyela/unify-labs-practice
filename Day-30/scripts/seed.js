

const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');

const uri = process.env.MONGO_URI; 
const dbName = 'titan_marketplace';

if (!uri) {
    console.error("❌ ERROR: MONGO_URI environment variable is missing.");
    console.info("Usage: MONGO_URI='your_atlas_string' node scripts/seed.js");
    process.exit(1);
}

const client = new MongoClient(uri);

async function seedDatabase() {
    try {
        console.log("⏳ Connecting to MongoDB Atlas...");
        await client.connect();
        console.log("✅ Connected successfully.");

        const db = client.db(dbName);
        const productsCollection = db.collection('products');

        const productsPath = path.join(__dirname, '../data/products.json');
        const rawData = fs.readFileSync(productsPath, 'utf-8');
        const products = JSON.parse(rawData);

        console.log("🧹 Clearing existing products...");
        await productsCollection.deleteMany({});

        console.log(`📦 Inserting ${products.length} products...`);
        const result = await productsCollection.insertMany(products);
        
        console.log(`✅ Successfully inserted ${result.insertedCount} products.`);

    } catch (error) {
        console.error("❌ Database Seeding Failed:", error);
    } finally {
       
        console.log("🔌 Closing database connection.");
        await client.close();
    }
}

seedDatabase();