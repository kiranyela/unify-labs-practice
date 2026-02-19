const docs = [
  {
    name: "Alice Johnson",
    role: "Frontend Intern",
    joinedDate: new Date("2024-06-15"),
  },
  {
    name: "Brian Lee",
    role: "Backend Intern",
    joinedDate: new Date("2024-07-01"),
  },
  {
    name: "Carla Mendes",
    role: "Data Intern",
    joinedDate: new Date("2024-08-10"),
  },
];

const conn = new Mongo();
const db = conn.getDB("unify_labs");
const res = db.interns.insertMany(docs);
print(`Inserted ${res.insertedCount} documents into unify_labs.interns`);
