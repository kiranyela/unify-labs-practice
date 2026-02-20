const products = [
  {
    name: "Smartphone X",
    category: "Electronics",
    price: 799,
    stock: 25,
    specs: { color: "Black", weight: "180g" },
  },
  {
    name: "Laptop Pro",
    category: "Electronics",
    price: 1299,
    stock: 10,
    specs: { color: "Silver", weight: "1.5kg" },
  },
  {
    name: "Denim Jacket",
    category: "Clothing",
    price: 89,
    stock: 50,
    specs: { color: "Blue", weight: "700g" },
  },
  {
    name: "Sofa Set",
    category: "Furniture",
    price: 1500,
    stock: 5,
    specs: { color: "Grey", weight: "40kg" },
  },
  {
    name: "T-shirt Basic",
    category: "Clothing",
    price: 25,
    stock: 100,
    specs: { color: "White", weight: "200g" },
  },
];

const conn = new Mongo();
const db = conn.getDB("unify_labs");
db.products.insertMany(products);
