const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");

const app = express();
app.use(express.json());

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017";
const client = new MongoClient(uri, { serverSelectionTimeoutMS: 5000 });
let db;

async function start() {
  try {
    await client.connect();
    db = client.db("unify_labs");
    const port = process.env.PORT || 3000;
    app.listen(port);
  } catch (err) {
    console.error("Failed to start server:", err.message);
    process.exit(1);
  }
}

app.post("/products", async (req, res) => {
  const { name, price, stock } = req.body;
  if (!name || price == null || stock == null)
    return res.status(400).send("Missing fields");
  const result = await db
    .collection("products")
    .insertOne({ name, price, stock });
  res
    .status(201)
    .json(
      result.ops
        ? result.ops[0]
        : { _id: result.insertedId, name, price, stock }
    );
});

app.get("/products", async (req, res) => {
  const products = await db.collection("products").find().toArray();
  res.json(products);
});

app.patch("/products/:id", async (req, res) => {
  const { id } = req.params;
  const { stock } = req.body;
  if (stock == null) return res.status(400).send("Missing stock");
  const result = await db
    .collection("products")
    .updateOne({ _id: new ObjectId(id) }, { $set: { stock } });
  if (result.matchedCount === 0)
    return res.status(404).send("Product not found");
  res.json({ updated: result.modifiedCount });
});

app.delete("/products/:id", async (req, res) => {
  const { id } = req.params;
  const result = await db
    .collection("products")
    .deleteOne({ _id: new ObjectId(id) });
  if (result.deletedCount === 0)
    return res.status(404).send("Product not found");
  res.json({ deleted: true });
});

start();
