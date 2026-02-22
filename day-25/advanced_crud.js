// Advanced CRUD: Shop Manager Inventory Control
// Requirements:
// 1. Mass price increase for Electronics
// 2. Set 'featured: true' for items priced > 500
// 3. Delete items with stock = 0
// 4. Verify count after deletion
// 5. Update category names
// 6. Add 'new-arrival' tag to specific items

const conn = new Mongo();
const db = conn.getDB("unify_labs");

// 1. Increase price of all 'Electronics' by +10
const priceUpdate = db.products.updateMany(
  { category: "Electronics" },
  { $inc: { price: 10 } }
);
print("Electronics price increased:", priceUpdate.modifiedCount);

// 2. Set 'featured: true' for all items priced > 500
const featuredUpdate = db.products.updateMany(
  { price: { $gt: 500 } },
  { $set: { featured: true } }
);
print("Featured items updated:", featuredUpdate.modifiedCount);

// 3. Delete all documents where 'stock' is 0
const deleteResult = db.products.deleteMany({ stock: 0 });
print("Deleted items with zero stock:", deleteResult.deletedCount);

// 4. Verify count after deletion
const count = db.products.countDocuments();
print("Product count after cleanup:", count);

// 5. Update category names (example: Clothing -> Apparel)
const categoryUpdate = db.products.updateMany(
  { category: "Clothing" },
  { $set: { category: "Apparel" } }
);
print("Category updated:", categoryUpdate.modifiedCount);

// 6. Add 'new-arrival' tag to specific items (e.g., price < 100)
const tagUpdate = db.products.updateMany(
  { price: { $lt: 100 } },
  { $push: { tags: "new-arrival" } }
);
print("New-arrival tag added:", tagUpdate.modifiedCount);
