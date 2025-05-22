Creating an **HTTP server in Node.js** without any external libraries like Express is quite simple, thanks to Node.js’s built-in `http` module.

`https(protocol)://domain/path `

- http has no ssl and is less secure and where as https is secure and has ssl certified

- url is userfriendly name of ip adress

Here’s a complete explanation and working example:

---

Here’s a clear and concise explanation of **HTTP methods**, which are the core of RESTful APIs:

---

## 🌐 HTTP Methods (aka HTTP Verbs)

These are used to **communicate intent** when sending a request to a server.

---

### 1. **GET**

- 🔍 **Purpose**: Retrieve data from the server.
- 🧱 Example:

  ```http
  GET /api/users
  ```

- ✅ Safe, doesn’t modify anything.
- ✅ Idempotent (same result every time).

---

### 2. **POST**

- ➕ **Purpose**: Create new data on the server.
- 🧱 Example:

  ```http
  POST /api/users
  Body: { "name": "Sanjana" }
  ```

- ❌ Not idempotent (repeating the request creates multiple users).

---

### 3. **PUT**

- 🛠️ **Purpose**: Replace **entire** resource.
- 🧱 Example:

  ```http
  PUT /api/users/123
  Body: { "name": "Sanjana", "age": 21 }
  ```

- ✅ Idempotent (same result on repeat).

---

### 4. **PATCH**

- 🧩 **Purpose**: Update **part of** a resource.
- 🧱 Example:

  ```http
  PATCH /api/users/123
  Body: { "age": 22 }
  ```

- ✅ Used for partial updates (more efficient than PUT).

---

### 5. **DELETE**

- ❌ **Purpose**: Delete a resource.
- 🧱 Example:

  ```http
  DELETE /api/users/123
  ```

- ✅ Idempotent (deleting already deleted user still returns 204 or 404).

---

## 🧠 Summary Points

- **GET**

  - Use Case: Fetch data from the server
  - Idempotent: Yes (repeating the request gives the same result)
  - Modifies Server: No

- **POST**

  - Use Case: Create a new resource on the server
  - Idempotent: No (repeating the request creates multiple resources)
  - Modifies Server: yes

- **PUT**

  - Use Case: Replace an existing resource entirely
  - Idempotent: Yes (repeating the request gives the same result)
  - Modifies Server: Yes

- **PATCH**

  - Use Case: Update part of an existing resource
  - Idempotent: Yes (repeating the request gives the same result)
  - Modifies Server: Yes

- **DELETE**
  - Use Case: Remove a resource from the server
  - Idempotent: Yes (repeating the request has the same effect)
  - Modifies Server: Yes

---

Would you like a small example Node.js server using all these HTTP methods for a `/users` route?

## ✅ Step-by-Step: Create a Simple HTTP Server in Node.js

### 📦 1. Create a File

Let's say the file is named `server.js`.

### 🧠 2. Use the `http` Module

Node.js comes with a built-in `http` module to create servers.

### 🧾 Example Code

```js
// Import the http module
const http = require("http");

// Define the port
const PORT = 3000;

// Create the server
const server = http.createServer((req, res) => {
  // Set the response header
  res.setHeader("Content-Type", "text/plain");

  // Handle different routes
  if (req.method === "GET" && req.url === "/") {
    res.statusCode = 200;
    res.end("✅ Hello from Node.js HTTP server!");
  } else if (req.method === "GET" && req.url === "/about") {
    res.statusCode = 200;
    res.end("📘 About Page");
  } else {
    res.statusCode = 404;
    res.end("❌ Page Not Found");
  }
});

// Start the server
server.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
```

---

### ▶️ To Run the Server

In your terminal:

```bash
node server.js
```

Then go to:

- `http://localhost:3000/` → Shows home message
- `http://localhost:3000/about` → Shows about message
- Any other route → Shows 404

---

## 🧠 What’s Happening?

- `http.createServer()` creates the server and handles **incoming HTTP requests**.
- The callback `(req, res) => {}` gets executed every time a request hits the server.
- We read `req.method` (e.g., GET) and `req.url` (e.g., `/about`) to route manually.
- `res.end()` sends a response to the client.

---

## 💡 Want to go a step further?

You can:

- Serve HTML or JSON
- Use `fs` to read files and return them
- Add routing logic
- Build a basic REST API (manually)

Would you like an example of a **REST API** using `http` module (without Express)?
Great question! Let's break it down simply:

---

## 🧾 What is a **Header** in HTTP?

An **HTTP header** is a **key-value pair** sent **as part of the request or response** between the client (like a browser or React app) and the server (like Node.js).

There are two types:

### 1. **Request Headers**

Sent **from the client** to the server. They give information about:

- The browser or client (`User-Agent`)
- What type of response the client wants (`Accept`)
- Security credentials (`Authorization`)
- CORS info (`Origin`, `Access-Control-Request-*`)

Example:

```http
GET / HTTP/1.1
Host: example.com
User-Agent: Mozilla/5.0
Accept: text/html
```

---

### 2. **Response Headers**

Sent **from the server** back to the client. They tell the client about:

- Type of content (`Content-Type`)
- Caching instructions (`Cache-Control`)
- CORS permissions (`Access-Control-Allow-Origin`)
- Cookies (`Set-Cookie`)

Example:

```http
HTTP/1.1 200 OK
Content-Type: text/html
Access-Control-Allow-Origin: *
```

---

## 💡 In Node.js

You set a response header like this:

```js
res.setHeader("Content-Type", "application/json");
```

That tells the client: "Hey! I'm sending you JSON, not plain text or HTML."

---

## 📦 Real Example in Node.js

```js
const http = require("http");

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "text/plain"); // Set response header
  res.end("Hello world!");
});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
```

The browser knows the server is sending plain text **because of the header**.

---

Would you like to see **common headers** used in a REST API or with CORS?

### 🔍 What are **Query Parameters**?

**Query Parameters** are **key-value pairs** added to the end of a URL to **pass data** to a server. They are **not required** but help the client **filter**, **search**, or **customize** the data from an API.

---

## 🧱 Basic Format:

```
http://example.com/api/products?category=shoes&sort=price
```

- `?` starts the query string
- `category=shoes` is one key-value pair
- `&` separates multiple parameters
- `sort=price` is another key-value pair

---

## 🛠️ Real Example: Node.js (Express)

### ✅ Client Side:

```js
fetch("http://localhost:5000/api/books?author=tolkien&year=1954");
```

### ✅ Server Side (Express):

```ts
app.get("/api/books", (req, res) => {
  const author = req.query.author;
  const year = req.query.year;

  res.send(`You searched for books by ${author} from ${year}`);
});
```

---

## ✅ When to Use Query Params:

**Common Use Cases for Query Parameters:**

- **Filtering:**  
  Example: `/api/products?category=electronics`

- **Searching:**  
  Example: `/api/users?name=sanjana`

- **Pagination:**  
  Example: `/api/posts?page=2&limit=10`

- **Sorting:**  
  Example: `/api/comments?sort=latest`

## 🧠 Query vs Route Params

**Query Parameters** are used to send optional data to the server, such as filters or search terms.  
Example: `/api/items?type=fruit`

**Route Parameters** are used to send required data, such as an item ID, as part of the URL path.  
Example: `/api/items/:id` (e.g., `/api/items/42`)

---

Would you like to see how query parameters are used in **React with Axios** or how to build filtering logic using them in your backend?

Great question! Here's a **clear breakdown** of the differences between **Headers**, **Query Parameters**, **Route Parameters**, and **Pagination**—these are essential concepts for building and consuming APIs.

---

## 📌 1. **Route Parameters**

### ➤ What?

Used to **identify a specific resource** in the URL path.

### 🧱 Example:

```
GET /api/users/123
```

- `123` is a **route parameter**, often used as an ID.
- Defined in Express as:

```ts
app.get("/api/users/:id", (req, res) => {
  const userId = req.params.id;
});
```

### ✅ Use for:

- Resource identification (e.g., user ID, post ID)
- Required values

---

## 📌 2. **Query Parameters**

### ➤ What?

Used to **filter, search, or modify the result**. Added after `?` in the URL.

### 🧱 Example:

```
GET /api/users?role=admin&active=true
```

- `role` and `active` are **query parameters**.
- Access in Express as:

```ts
app.get("/api/users", (req, res) => {
  const { role, active } = req.query;
});
```

### ✅ Use for:

- Filtering (`?category=tech`)
- Searching (`?q=shoes`)
- Pagination (`?page=2&limit=10`)
- Optional values

---

## 📌 3. **Headers**

### ➤ What?

**Metadata** sent along with the request (not visible in URL). Used for things like **authentication**, **content type**, etc.

### 🧱 Example:

```http
GET /api/profile HTTP/1.1
Authorization: Bearer token123
Content-Type: application/json
```

- Access in Express as:

```ts
app.get("/api/profile", (req, res) => {
  const token = req.headers.authorization;
});
```

### ✅ Use for:

- Authorization tokens
- Content type
- Custom metadata

---

## 📌 4. **Pagination**

### ➤ What?

Pagination is the process of **splitting large sets of data into pages**, so clients load them in parts rather than all at once.

### 🧱 Example:

```
GET /api/posts?page=2&limit=5
```

- `page=2`: Load the second page.
- `limit=5`: Each page has 5 items.

### ✅ Use for:

- Efficiently loading large datasets
- Improving performance and UX

---

## 🧠 Summary Points

- **Route Parameters**

  - Appear in the URL path (e.g., `/users/:id`)
  - Accessed in Express with `req.params`
  - Commonly used to identify a specific item

- **Query Parameters**

  - Appear in the URL after `?` (e.g., `?key=value`)
  - Accessed in Express with `req.query`
  - Used for searching, filtering, sorting, and pagination

- **Headers**

  - Do not appear in the URL
  - Accessed in Express with `req.headers`
  - Used for authentication, metadata, and content type

- **Pagination**
  - Implemented via query parameters in the URL (e.g., `?page=2&limit=10`)
  - Accessed in Express with `req.query`
  - Used for loading data in chunks

Would you like to see how to implement pagination in your Node + React Todo app?
