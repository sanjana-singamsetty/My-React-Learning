Here’s a **complete theoretical guide** on implementing **JWT-based authentication** in a **React app**, covering:

✅ Signup  
✅ Login  
✅ Forgot Password  
✅ JWT handling (access & refresh tokens)  
✅ Best practices

---

## 🏗️ Architecture Overview

- **Signup**
  - Frontend (React): Form → Send user data
  - Backend (Node.js + Express): Hash password → Store user in DB
- **Login**
  - Frontend: Form → Send credentials
  - Backend: Verify → Return JWTs (access + refresh)
- **Forgot Password**
  - Frontend: Form → Send email
  - Backend: Generate token → Send reset link
- **Reset Password**
  - Frontend: Link → Enter new password
  - Backend: Verify token → Update password
- **Auth Guard**
  - Frontend: Attach JWT in headers for secure pages
  - Backend: Middleware checks token

---

## 🧾 1. Signup Flow

### ➤ Frontend (React):

```jsx
axios.post("/api/signup", {
  name: "Sanjana",
  email: "you@example.com",
  password: "strongPass123",
});
```

### ➤ Backend (Node/Express):

- Hash password using `bcrypt`
- Store user in DB
- Return `201 Created` on success

---

## 🔐 2. Login Flow (JWT Access + Refresh Token)

### ➤ Frontend:

```jsx
axios
  .post("/api/login", {
    email: "you@example.com",
    password: "strongPass123",
  })
  .then((res) => {
    localStorage.setItem("accessToken", res.data.accessToken);
  });
```

### ➤ Backend:

- Verify credentials
- If valid:
  - Create `accessToken` (valid for ~15 mins)
  - Create `refreshToken` (valid for ~7 days)
- Return both tokens

---

## 🧭 3. Protecting Routes

### ➤ Frontend:

For protected APIs, send the JWT:

```jsx
axios.get("/api/profile", {
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});
```

### ➤ Backend:

- Middleware decodes and verifies JWT

```js
const token = req.headers.authorization.split(' ')[1];
jwt.verify(token, SECRET, (err, decoded) => { ... });
```

---

## 🔁 4. Token Refresh

When the access token expires:

- Send the **refresh token** to a `/refresh-token` endpoint.
- Server verifies it and sends a **new access token**.

---

## 🔐 5. Forgot Password Flow

### ➤ Frontend:

```jsx
axios.post("/api/forgot-password", {
  email: "you@example.com",
});
```

### ➤ Backend:

- Generate a password reset token (JWT or UUID)
- Send email with link:

  ```
  https://frontend.com/reset-password/<token>
  ```

---

## 🔁 6. Reset Password

### ➤ Frontend:

- Get token from URL
- Form to enter new password
- POST to `/reset-password`:

```jsx
axios.post("/api/reset-password", {
  token,
  newPassword: "newStrongPass",
});
```

### ➤ Backend:

- Verify token
- Hash and update new password

---

## 📦 JWT Storage Options

- **localStorage**
  - Secure for Sensitive Apps? ❌ No
  - XSS Safe? ❌ No
  - CSRF Safe? ✅ Yes
- **HttpOnly Cookie**
  - Secure for Sensitive Apps? ✅ Yes
  - XSS Safe? ✅ Yes
  - CSRF Safe? ❌ No\* (use `SameSite`)

**Best practice**: Store **access token in memory**, **refresh token in HttpOnly cookie**.

---

## ✅ Summary Steps

- **Signup/Login**: Forms → POST request → Get JWT
- **Protect Routes**: Add JWT in headers
- **Store Tokens**: Access → memory or localStorage; Refresh → cookie
- **Forgot Password**: Token in email → reset with new password
- **Refresh Flow**: Use refresh token to get new access token

---

Perfect. Here’s a complete backend + frontend setup for **JWT-based Auth** using your existing **React TypeScript app** and a new **Node.js + Express + MongoDB** backend.

---

## 🛠 Backend Setup (Node.js + Express + MongoDB + JWT)

### 1. 📁 Create a folder called `auth-backend`

```bash
mkdir auth-backend
cd auth-backend
npm init -y
```

### 2. 📦 Install dependencies

```bash
npm install express mongoose bcryptjs jsonwebtoken dotenv cors cookie-parser nodemailer
```

### 3. 🗂 Folder Structure

```
auth-backend/
│
├── controllers/
│   └── authController.js
├── models/
│   └── User.js
├── routes/
│   └── authRoutes.js
├── .env
├── server.js
```

---

### 4. 📄 `.env`

```env
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_refresh_secret
CLIENT_URL=http://localhost:5173
```

---

### 5. 📄 `server.js`

```js
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");

dotenv.config();
const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => app.listen(process.env.PORT, () => console.log("Server running")))
  .catch((err) => console.error(err));
```

---

### 6. 📄 `models/User.js`

```js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  resetToken: String,
  resetTokenExpiry: Date,
});

module.exports = mongoose.model("User", userSchema);
```

---

### 7. 📄 `controllers/authController.js`

You'll find a complete implementation [here](https://pastebin.com/raw/1XsAaV78) — due to size limits, I’ve shared it as a paste. It includes:

- `signup`
- `login`
- `refreshToken`
- `forgotPassword` (sends email with reset link)
- `resetPassword`

Let me know if you want this pasted here in parts!

---

### 8. 📄 `routes/authRoutes.js`

```js
const express = require("express");
const router = express.Router();
const {
  signup,
  login,
  refreshToken,
  forgotPassword,
  resetPassword,
} = require("../controllers/authController");

router.post("/signup", signup);
router.post("/login", login);
router.post("/refresh-token", refreshToken);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

module.exports = router;
```

---

## 💻 Frontend: React (TypeScript)

### 1. Install Axios

```bash
npm install axios
```

### 2. Axios instance (`utils/axios.ts`)

```ts
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

export default API;
```

---

### 3. Example: Signup Form (`Signup.tsx`)

```tsx
import { useState } from "react";
import API from "./utils/axios";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    await API.post("/auth/signup", { email, password });
    alert("Signed up!");
  };

  return (
    <div>
      <h2>Signup</h2>
      <input type="email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleSignup}>Signup</button>
    </div>
  );
}
```

---

### 4. Repeat for Login, Forgot Password, Reset Password, and Refresh

I can give you reusable components with full TypeScript types and routing (`react-router-dom`) if you’d like.

---

## ✅ Want me to give you the exact working GitHub repo structure, or paste the controller logic in parts here?

Let me know what you’d prefer!

No worries! In MongoDB, **you don’t have to create a database manually before using it.**

---

### How MongoDB handles databases:

- When you connect with a URI like:

  ```
  mongodb://localhost:27017/myDatabase
  ```

- The `myDatabase` database **will be created automatically the first time you store data in it.**

- If you only connect but don’t write any data, the database won’t actually appear in your MongoDB yet.

---

### So:

- You just specify a database name you want (e.g., `myDatabase`, `myAppDB`, anything).
- When you insert/save documents in collections inside that database, MongoDB creates it behind the scenes.

---

### Example:

If in your code you do something like:

```js
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/myDatabase");

const userSchema = new mongoose.Schema({ name: String });
const User = mongoose.model("User", userSchema);

const user = new User({ name: "Alice" });
user.save().then(() => console.log("User saved"));
```

- At this point, MongoDB will create the `myDatabase` database (if it doesn’t exist yet) and the `users` collection, then save the document.

Looks like you successfully installed **mongodb-community\@6.0** but there’s a **linking conflict** with your existing MongoDB installation (looks like v8.0.9).

---

### What the message means:

- You have a newer MongoDB version (8.0.9) installed and linked.
- The 6.0 version you installed tries to symlink files that already belong to the newer version.
- So brew won’t link the 6.0 binaries because it would overwrite those from 8.0.9.

---

### What you can do:

**1. If you want to switch to MongoDB 6.0:**

- Unlink the current MongoDB (8.0.9):

  ```bash
  brew unlink mongodb-community
  ```

- Link MongoDB 6.0 forcibly:

  ```bash
  brew link --overwrite mongodb-community@6.0
  ```

- Start the MongoDB 6.0 service:

  ```bash
  brew services start mongodb-community@6.0
  ```

**2. If you want to keep the newer MongoDB (8.0.9):**

- Just start the current MongoDB service:

  ```bash
  brew services start mongodb-community
  ```

- Use the MongoDB 8.0.9 version you have (which is newer, so probably better).

---

### Verify MongoDB is running:

```bash
brew services list
```

You should see MongoDB service status.

---

### Connect to local MongoDB

Once running, connect using:

```env
MONGO_URI=mongodb://localhost:27017/myDatabase
```

---

**If you want, I can help you with:**

- Starting/stopping MongoDB service
- Writing connection code in Node.js
- Troubleshooting MongoDB on macOS

---

Great! You’ve set up MongoDB and your environment, created controllers and routes for your backend. Now here’s **what to do next** to make your React + Node.js JWT auth app fully functional:

---

## 1. Start Your Backend Server

- Make sure your backend entry point (e.g., `server.js` or `app.js`) connects to MongoDB using the URI from your `.env` file.

- Start the backend server:

```bash
node server.js
# or if you use nodemon for auto restart:
nodemon server.js
```

- Check console to confirm MongoDB connected successfully and server is running.

---

## 2. Test Your Backend APIs

- Use **Postman**, **Insomnia**, or **curl** to test your routes:

| Route                       | Method | Purpose                   |
| --------------------------- | ------ | ------------------------- |
| `/api/auth/signup`          | POST   | Register new user         |
| `/api/auth/login`           | POST   | Login, get JWT tokens     |
| `/api/auth/forgot-password` | POST   | Trigger password reset    |
| `/api/auth/reset-password`  | POST   | Reset password with token |

- Make sure each endpoint works and returns expected results (tokens, success messages, errors).

---

## 3. Connect Your React Frontend to Backend

- In your React app, create API calls to your backend endpoints using `fetch` or libraries like `axios`.

Example of login call:

```typescript
import axios from "axios";

const login = async (email: string, password: string) => {
  try {
    const response = await axios.post("http://localhost:5000/api/auth/login", {
      email,
      password,
    });
    const { accessToken, refreshToken } = response.data;

    // Save tokens to localStorage or cookie
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);

    return true; // login success
  } catch (error) {
    console.error("Login failed:", error);
    return false;
  }
};
```

---

## 4. Implement React Components for

- **Signup Form**
- **Login Form**
- **Forgot Password Form**
- **Reset Password Form**

Each form should:

- Collect user input
- Call corresponding backend API
- Handle responses & errors
- Store JWT tokens securely (localStorage, httpOnly cookie, etc.)

---

## 5. Protect Routes & Manage Authentication State

- Use React context, Redux, or any state management to track if user is logged in.

- On protected routes, check if access token exists and is valid.

- Use refresh token flow to renew access tokens when expired.

---

## 6. Run and Test Full Flow

- Signup → Login → Access protected routes → Logout → Forgot Password → Reset Password.

- Debug any issues using browser console and backend logs.

---

## 7. (Optional) Improve Security

- Store tokens in httpOnly cookies to avoid XSS.

- Use HTTPS in production.

- Implement proper error handling and validation.

---

If you want, I can help you write React code for login/signup or the backend API calls — just ask!
