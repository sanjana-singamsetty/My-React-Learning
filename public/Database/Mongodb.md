Mongo db

MongoDB is a document database and can be installed locally or hosted in the cloud

- Designed to **store and manage large volumes** of unstructured or semi-structured data.
- **NoSQL**: Uses collections and documents instead of tables and rows.
- **Document-oriented**: Stores data in JSON-like documents (BSON internally), allowing for flexible and nested data structures.
- **Schema-less**: No need to define a fixed schema; documents in the same collection can have different structures.

---

### 📦 **Structure:**

- **Database** ➝ Contains **collections**
- **Collection** ➝ Like a table in SQL, contains multiple **documents**
- **Document** ➝ Like a row in SQL, but stored as a JSON object

#### Example document:

```json
{
  "_id": "1",
  "name": "Alice",
  "email": "alice@example.com",
  "age": 25,
  "hobbies": ["reading", "cycling"]
}
```

---

### 🛠️ **Why use MongoDB?**

- **Flexible schema** – great for rapidly evolving applications.
- **Scales easily** – built for horizontal scaling and high availability.
- **Rich query language** – supports powerful filtering, aggregation, indexing.
- **Developer-friendly** – natural JSON syntax makes it easy to use with JavaScript/Node.js.

---

### ✅ Common Use Cases:

- Web and mobile apps
- Real-time analytics
- Content management systems (CMS)
- IoT and sensor data storage
- E-commerce platforms

---

- SQL databases are known as relational databases because they organize data into related tables. When you need information, you often join data from multiple tables based on relationships.

- MongoDB, on the other hand, is a document-oriented (non-relational or non-tabular) database. This doesn't mean you can't represent relationships—it just means data is stored differently. Instead of splitting related data across tables, MongoDB allows you to store related information together in flexible, JSON-like documents. This structure can make data retrieval faster and more straightforward.

- Collections in MongoDB serve a similar purpose to tables in SQL databases, grouping related documents together.

### 🖥️ Installing MongoDB Shell (mongosh)

To interact with your MongoDB database, you'll need the MongoDB Shell (`mongosh`).

1. **Install mongosh:**  
   Follow the [official installation guide](https://www.mongodb.com/docs/mongodb-shell/install/) for your operating system.

2. **Verify installation:**  
   Open your terminal and run:

```bash
mongosh --version
```

If installed correctly, this will display the version number of mongosh.
