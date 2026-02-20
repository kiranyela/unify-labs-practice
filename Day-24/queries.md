Find all Electronics:
db.products.find({ category: 'Electronics' })

Top 2 most expensive:
db.products.find().sort({ price: -1 }).limit(2)
