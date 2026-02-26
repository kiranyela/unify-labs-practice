require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

const uri = process.env.MONGO_URI;
const dbName = 'titan_marketplace';
let db;

if (!uri) {
    console.error("❌ FATAL: MONGO_URI environment variable is missing.");
    process.exit(1);
}

async function connectDB() {
    try {
        const client = new MongoClient(uri);
        await client.connect();
        db = client.db(dbName);
        console.log("✅ Connected to MongoDB Atlas.");
    } catch (error) {
        console.error("❌ Database connection failed:", error);
        process.exit(1);
    }
}
connectDB();

// API ROUTES
app.get('/api/products', async (req, res) => {
    try {
        const { category, search } = req.query;
        let query = {};
        
        if (category && category !== 'all') query.category = category;
        if (search) query.name = { $regex: search, $options: 'i' }; 

        const products = await db.collection('products').find(query).toArray();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

app.post('/api/orders', async (req, res) => {
    try {
        const { customer, items } = req.body;
        if (!customer || !customer.name || !customer.email || !items || items.length === 0) {
            return res.status(400).json({ error: "Invalid order data provided." });
        }

        let calculatedTotal = 0;
        const enrichedItems = [];

        for (const item of items) {
            const product = await db.collection('products').findOne({ _id: new ObjectId(item._id) });
            if (!product) return res.status(404).json({ error: `Product ${item._id} not found.` });

            const itemTotal = product.price * item.quantity;
            calculatedTotal += itemTotal;
            enrichedItems.push({
                productId: product._id,
                name: product.name,
                priceAtPurchase: product.price,
                quantity: item.quantity,
                subtotal: itemTotal
            });
        }

        const order = {
            customer,
            items: enrichedItems,
            total: calculatedTotal,
            status: 'pending',
            createdAt: new Date()
        };
        
        const result = await db.collection('orders').insertOne(order);
        res.status(201).json({ message: "Order placed successfully!", orderId: result.insertedId, totalCharged: calculatedTotal });

    } catch (error) {
        res.status(500).json({ error: "Internal server error during checkout." });
    }
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
}

module.exports = app;