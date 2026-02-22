const { connect } = require("./db");

(async () => {
  try {
    const { client, db } = await connect();

    const products = await db.collection("products").find().toArray();
    console.log(`Fetched ${products.length} products`);
    console.log(products);

    await client.close();
    console.log("Connection closed");
  } catch (err) {
    console.error("Error fetching products:", err.message);
    process.exit(1);
  }
})();
