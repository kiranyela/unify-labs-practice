# Day 27 — Shop API: Open for Business

This Express app connects to MongoDB and exposes CRUD endpoints for products.

## Setup

1. Install dependencies:

```powershell
npm install
```

2. Start the server:

```powershell
npm start
```

Server runs on port 3000.

## Endpoints

- `POST /products` — Add product `{name, price, stock}`
- `GET /products` — List all products
- `PATCH /products/:id` — Update only `stock` field
- `DELETE /products/:id` — Remove by ID

## Testing

Use Postman or similar tool to test endpoints.

## Notes

- MongoDB must be running locally on `mongodb://localhost:27017`.
