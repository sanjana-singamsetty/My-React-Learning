To connect **Node.js** with **MongoDB**, you typically use the official MongoDB driver or **Mongoose** (an ODM library). Here's a step-by-step guide using both methods:

---

## ✅ Option 1: Using **Mongoose** (recommended for most apps)

### 1. **Install dependencies**

```bash
npm install mongoose
```

### 2. **Connect to MongoDB**

```js
// db.js or index.js
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/mydatabase", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Connection error:", err));
```

> 🔁 Replace `mydatabase` with your DB name
> 🌐 Use `mongodb+srv://<username>:<password>@cluster.mongodb.net/mydatabase` for cloud (MongoDB Atlas)

### 3. **Define a model**

```js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
```

---

## ✅ Option 2: Using **MongoDB native driver**

### 1. **Install MongoDB driver**

```bash
npm install mongodb
```

### 2. **Connect to MongoDB**

```js
// db.js
const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function connectDB() {
  try {
    await client.connect();
    console.log("MongoDB connected");
    const db = client.db("mydatabase");
    return db;
  } catch (error) {
    console.error("Connection error:", error);
  }
}

module.exports = connectDB;
```

### 3. **Use the DB**

```js
const connectDB = require("./db");

async function run() {
  const db = await connectDB();
  const users = db.collection("users");

  const newUser = { name: "Sanjana", email: "sanjana@example.com" };
  await users.insertOne(newUser);
  console.log("User added");
}

run();
```

---

## 🌟 MongoDB Atlas (Cloud)?

If you're using MongoDB Atlas:

- Whitelist your IP in the Atlas dashboard
- Use the **MongoDB connection string** it gives you:

  ```
  mongodb+srv://<username>:<password>@cluster0.mongodb.net/mydatabase?retryWrites=true&w=majority
  ```

---

Let me know if you're using Mongoose, MongoDB Atlas, or native driver, and I can help you tailor the code further!
