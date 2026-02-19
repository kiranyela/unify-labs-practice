# Day 23 — NoSQL Foundation

Database Groundwork: install MongoDB, verify the local connection, and create your first visual database in Compass.

Checklist

- [ ] Download and install MongoDB Community Server (MSI)
- [ ] Install MongoDB Compass
- [ ] Verify `mongosh --version` in PowerShell
- [ ] Connect to `mongodb://localhost:27017` in Compass
- [ ] Create database `unify_labs` and collection `interns`
- [ ] Insert 3 sample documents into `interns`

Quick plan

1. Install MongoDB and Compass (winget or MSI).
2. Start the MongoDB service if it isn't running.
3. Verify `mongosh` is available.
4. Use MongoDB Compass to create `unify_labs` and `interns`, or run the provided script.

Install (Windows, PowerShell)
Use the official MSI from mongodb.com or install via Winget (recommended if available):

```powershell
winget install --id MongoDB.MongoDBServer -e
winget install --id MongoDB.MongoDBCompass -e
```

If you prefer Chocolatey:

```powershell
choco install mongodb -y
choco install mongodb-compass -y
```

Start the service
If the installer didn't start the service automatically, run:

```powershell
net start MongoDB
# or, if installed as a different service name, open Services.msc and start the MongoDB service
```

Verify mongosh
Open PowerShell and run:

```powershell
mongosh --version
```

This should print the mongosh version. If it fails, add MongoDB's `bin` folder to your PATH or restart the terminal.

Connect with Compass

1. Open MongoDB Compass.
2. For a local connection use the connection string: `mongodb://localhost:27017` (or press "Fill in connection fields individually" and use Host: `localhost`, Port: `27017`).
3. Connect.

Create database and collection (Compass GUI)

1. After connecting, click "Create Database".
2. Enter Database Name: `unify_labs` and Collection Name: `interns`.
3. Create.
4. Open the `interns` collection and click "Insert Document" to add documents using the sample data below.

Insert via GUI (sample documents)
Use these three documents (copy/paste into Compass insert dialog):

{
"name": "Alice Johnson",
"role": "Frontend Intern",
"joinedDate": "2024-06-15"
}

{
"name": "Brian Lee",
"role": "Backend Intern",
"joinedDate": "2024-07-01"
}

{
"name": "Carla Mendes",
"role": "Data Intern",
"joinedDate": "2024-08-10"
}

Insert via `mongosh` (script)
A script is included (`insert_interns.js`). Run it from PowerShell to insert the same documents into `unify_labs.interns`:

```powershell
mongosh insert_interns.js
```



