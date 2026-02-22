# Day 26 — Backend Bridge: Connecting Your App

This small Node.js project connects to a local MongoDB server and fetches all products from the `unify_labs` database.

Prerequisites

- Node.js (16+ recommended)
- A running local MongoDB server on `mongodb://localhost:27017`

Quick start

1. Open a terminal in this folder.
2. Install dependencies:

```powershell
npm install
```

3. Run the fetch script:

```powershell
npm start
```

What the code does

- `db.js` exports an async `connect()` function that uses `MongoClient` to connect and pings the server. On success it prints `Database connected successfully`.
- `index.js` calls `connect()`, fetches all documents from the `products` collection in the `unify_labs` DB, prints the count and the objects, then closes the connection.

