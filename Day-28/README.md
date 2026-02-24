# Day 28 — Cloud Deployment: Migrate to MongoDB Atlas

This guide explains how to move your local shop data to MongoDB Atlas and update the app to use the cloud SRV string.

Atlas setup steps

1. Create an account at https://www.mongodb.com/atlas
2. Create a free Shared Cluster (M0) and wait for it to provision
3. In Network Access add your IP or 0.0.0.0/0 for wide access
4. In Database Access create a user with Read/Write access and save username/password
5. In Clusters, click Connect -> Connect your application and copy the connection string (SRV) e.g. `mongodb+srv://<user>:<password>@cluster0.abcd.mongodb.net/test?retryWrites=true&w=majority`

Code changes

- Replace `mongodb://localhost:27017` with your Atlas SRV string or set `MONGODB_URI` environment variable.

Run

```powershell
cd Day-27
$env:MONGODB_URI = 'mongodb+srv://<user>:<password>@cluster0.abcd.mongodb.net/unify_labs?retryWrites=true&w=majority'
npm install
npm start
```

Verify

- Use Postman to GET `/products` and confirm documents are returned from Atlas.
- Optionally migrate data from local to Atlas using `mongodump`/`mongorestore` or mongoimport.
