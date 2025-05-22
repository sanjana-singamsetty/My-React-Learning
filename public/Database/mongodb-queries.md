Here's a clear and practical guide to **MongoDB queries** with explanations and examples:

---

## 📦 MongoDB Structure Overview

- **Database**: Holds multiple **collections**.
- **Collection**: Contains multiple **documents** (JSON-like objects).
- **Document**: The actual data record.

**Example document:**

```json
{
  "_id": 1,
  "name": "Alice",
  "age": 25,
  "city": "Dublin",
  "skills": ["Python", "MongoDB"]
}
```

---

Here are some **basic MongoDB commands** to get you started once you've installed and started MongoDB and entered the shell using:

```bash
mongosh
```

---

## 🧭 1. **Check the Current Database**

```js
db;
```

> Shows the name of the database you're currently using (default is `test`).

---

## 📂 2. **Create or Switch to a Database**

```js
use myDatabase
```

> Switches to `myDatabase`. If it doesn’t exist, it will be created when you insert data.

---

## 📁 3. **Show All Databases**

```js
show dbs
```

> Lists all databases on your system.

---

## 📄 4. **Show All Collections in the Current DB**

```js
show collections
```

> Lists all collections (like tables) in the current database.

---

## ➕ 5. **Insert a Document**

```js
db.users.insertOne({ name: "Alice", age: 25 });
```

> Creates a `users` collection (if it doesn't exist) and inserts a document into it.

---

## 🔍 6. **Find Documents**

```js
db.users.find();
```

> Shows all documents in the `users` collection.

```js
db.users.find({ name: "Alice" });
```

> Finds documents where `name` is `"Alice"`.

---

## ✏️ 7. **Update a Document**

```js
db.users.updateOne({ name: "Alice" }, { $set: { age: 26 } });
```

> Updates Alice’s age to 26.

---

## ❌ 8. **Delete a Document**

```js
db.users.deleteOne({ name: "Alice" });
```

> Deletes the first matching document where `name` is `"Alice"`.

---

## 🔁 9. **Count Documents**

```js
db.users.countDocuments();
```

> Returns the number of documents in the `users` collection.

---

## 🧼 10. **Drop a Collection or Database**

```js
db.users.drop();
```

> Deletes the entire `users` collection.

```js
db.dropDatabase();
```

> Deletes the current database.

---

Let me know if you'd like cheat sheets, GUI tool suggestions (like MongoDB Compass), or how to use MongoDB with Node.js or Mongoose!

## 🔍 Basic MongoDB Queries Explained

> You can run these queries in the **MongoDB shell**, **MongoDB Compass**, or from your application code (e.g., Node.js).

---

### 1. **Find all documents**

Returns every document in the `users` collection.

```js
db.users.find();
```

---

### 2. **Find one document**

Returns the first document found in the `users` collection.

```js
db.users.findOne();
```

---

### 3. **Find documents matching a condition**

Finds all users whose `age` is 25.

```js
db.users.find({ age: 25 });
```

---

### 4. **Find with multiple conditions (AND logic)**

Finds users whose `age` is 25 **and** `city` is "Dublin".

```js
db.users.find({ age: 25, city: "Dublin" });
```

---

### 5. **Find with OR condition**

Finds users whose `age` is 25 **or** `city` is "Cork".

```js
db.users.find({ $or: [{ age: 25 }, { city: "Cork" }] });
```

---

### 6. **Comparison operators**

- `$gt`: greater than
- `$lt`: less than
- `$gte`: greater than or equal to
- `$lte`: less than or equal to

**Examples:**

```js
db.users.find({ age: { $gt: 25 } }); // age > 25
db.users.find({ age: { $lt: 30 } }); // age < 30
db.users.find({ age: { $gte: 25, $lte: 30 } }); // 25 <= age <= 30
```

---

### 7. **Query nested fields**

Finds users whose `address.city` is "Dublin".

```js
db.users.find({ "address.city": "Dublin" });
```

---

### 8. **Match values in arrays**

Finds users who have "MongoDB" in their `skills` array.

```js
db.users.find({ skills: "MongoDB" });
```

---

### 9. **Find documents where array contains multiple values**

Finds users whose `skills` array contains **both** "MongoDB" and "Python".

```js
db.users.find({ skills: { $all: ["MongoDB", "Python"] } });
```

---

## ✏️ Inserting Data

### Insert a single document

```js
db.users.insertOne({
  name: "Bob",
  age: 30,
  city: "Cork",
});
```

### Insert multiple documents

```js
db.users.insertMany([
  { name: "Charlie", age: 22 },
  { name: "Dana", age: 27 },
]);
```

---

## ✏️ Updating Data

### Update a single document

Updates the first user named "Alice" and sets their age to 26.

```js
db.users.updateOne({ name: "Alice" }, { $set: { age: 26 } });
```

### Update multiple documents

Updates all users in "Dublin" to add a `country` field.

```js
db.users.updateMany({ city: "Dublin" }, { $set: { country: "Ireland" } });
```

---

## ❌ Deleting Data

### Delete a single document

Removes the first user named "Bob".

```js
db.users.deleteOne({ name: "Bob" });
```

### Delete multiple documents

Removes all users in "Cork".

```js
db.users.deleteMany({ city: "Cork" });
```

---

## 📊 Aggregation Example

Groups users by `city` and calculates the average age for each city.

```js
db.users.aggregate([{ $group: { _id: "$city", avgAge: { $avg: "$age" } } }]);
```

---

Let me know if you want Node.js code examples or guidance on connecting and querying MongoDB with Express!
