JSON Web Tokens (JWT)
![System Design Diagram](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*AEmntZNyAoMpylE9b7FD9w.png)

Let's dive into **JWT (JSON Web Token)** — what it is, why it's used, and how it works — in a beginner-friendly way with real examples and diagrams.

---

## 🔐 What is JWT?

**JWT (JSON Web Token)** is a **compact, URL-safe token** used to **securely transmit data** between a client (like a browser or app) and a server.

It’s most commonly used for:

- ✅ **Authentication** (login sessions)
- ✅ **Authorization** (access control to APIs)

---

## 🧱 Structure of a JWT

A JWT has **3 parts**, separated by dots `.`:

```
xxxxx.yyyyy.zzzzz
```

It looks like this:

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.  // Header
eyJ1c2VySWQiOiIxMjM0NTYiLCJyb2xlIjoiYWRtaW4ifQ.  // Payload
SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c  // Signature
```

### 1. **Header**

Tells what type of token and which algorithm is used:

```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

### 2. **Payload**

The **data** inside the token (e.g., user info):

```json
{
  "userId": "123456",
  "role": "admin",
  "exp": 1717353600 // expiration time (optional)
}
```

### 3. **Signature**

Generated using a **secret key** to make sure the token wasn't tampered with:

```
HMACSHA256(
  base64UrlEncode(header) + "." + base64UrlEncode(payload),
  secret
)
```

---

## 🔁 How JWT Works (Login Flow)

### Step-by-Step:

1. **User logs in** with email and password.
2. **Server verifies** credentials and generates a JWT.
3. **Server sends the token** to the client.
4. **Client stores the token** (e.g., in localStorage or a cookie).
5. **Client includes JWT** in the header of every request:

```http
Authorization: Bearer <token>
```

6. **Server checks and decodes** the token to get user info (auth + roles).
7. ✅ **Access granted** if token is valid, ❌ denied if not.

---

## ✅ Advantages of JWT

- 🔁 **Stateless**: No need to store sessions on the server
- 🚀 **Scalable**: Great for microservices and APIs
- 🔐 **Signed**: Tokens can't be tampered with
- 💡 **Flexible**: Can store custom information (user ID, roles, etc.)

---

## ⚠️ Disadvantages

- ❌ **Hard to revoke**: Can't invalidate a token unless you track it
- ⏰ **Expires after set time**: You must handle refresh tokens manually
- ⚠️ **Can be stolen**: If stored insecurely (e.g., in localStorage)

---

## 🧠 Use JWT When…

✅ You're building:

- A **REST API**
- A **mobile app backend**
- A **microservice-based architecture**

❌ Don't use JWT if:

- You need **easy session management** (logouts, expiry).
- You're building a **traditional server-rendered web app** — use **sessions + cookies** instead.

---

## 🧪 Example (Node.js with JWT)

```js
const jwt = require("jsonwebtoken");

// Create a JWT
const token = jwt.sign({ userId: "123", role: "admin" }, "SECRET_KEY", {
  expiresIn: "1h",
});

// Verify a JWT
jwt.verify(token, "SECRET_KEY", (err, decoded) => {
  if (err) return console.log("Invalid token");
  console.log(decoded); // { userId: '123', role: 'admin', iat: ..., exp: ... }
});
```

---

## 🔐 Where to Store JWT on Client?

- **`localStorage`**

  - Easy to implement
  - Vulnerable to XSS (cross-site scripting) attacks

- **`HttpOnly Cookie`**
  - Safer from XSS
  - Works like traditional sessions

---

## 📘 Summary

- **What is JWT?**

  - A signed token storing user info

- **When to use?**

  - For authentication and access in stateless apps

- **How does it work?**

  - Sent with each API request

- **Is it secure?**
  - Yes, if signed and stored properly

---

Sure! Here's a **complete theoretical flow** of how **JWT-based login** works — both **frontend and backend** — step by step. This is a solid mental model you can use before diving into the code.

---

## 🧩 JWT-Based Login Flow — Full Stack (Theory Only)

---

### 👨‍💻 1. **Frontend: User Login Form**

- User enters **email** and **password** in a login form.
- User clicks “Login” button.
- Frontend sends a **POST request** to the backend’s `/login` endpoint.

```http
POST /api/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "secret123"
}
```

---

### 🛠️ 2. **Backend: Login Endpoint**

- The backend receives the email & password.
- It verifies the credentials by checking a **database**.
- If valid, the server creates a **JWT** containing user info:

```json
{
  "userId": "12345",
  "role": "user",
  "exp": <timestamp> // optional expiry
}
```

- Server signs the JWT using a **secret key**.

---

### 🎁 3. **Backend Response**

- Server sends the signed **JWT token** back to the client in the response.

```http
HTTP 200 OK
{
  "token": "<JWT_TOKEN>"
}
```

---

### 💾 4. **Frontend: Token Storage**

- The frontend stores the token:

  - Option 1: `localStorage` → easy but less secure
  - Option 2: **HttpOnly cookie** → more secure from XSS attacks

---

### 📡 5. **Frontend Makes Authenticated Requests**

- For any protected route (like `/profile`, `/orders`), the frontend includes the JWT in headers:

```http
GET /api/profile
Authorization: Bearer <JWT_TOKEN>
```

---

### 🔍 6. **Backend Verifies JWT**

- The server **extracts the token** from the `Authorization` header.
- It verifies the token using the **secret key**:

  - If valid → user is authenticated ✅
  - If invalid or expired → reject the request ❌

---

### 🔐 7. **Authorization (Role-Based, Optional)**

- Server reads the payload from JWT (e.g., role = 'admin').
- Based on the role, it **grants or denies access** to certain routes.

Example:

- `/admin/delete-user` → allowed only if `role: admin`.

---

### 🔁 8. **Session Persistence**

- As long as the token is valid (not expired), the user stays logged in.
- No session is stored on the server → **stateless authentication**.

---

### 🧼 9. **Logout**

- Frontend simply deletes the token from `localStorage` or cookie.
- Since no server session is stored, logout is just client-side cleanup.

---

## 🔐 Optional: Refresh Token Flow (Advanced)

- JWTs usually **expire quickly** (e.g., 15 mins).
- A **refresh token** (longer-lived, stored securely) can be used to get new JWTs.
- This avoids forcing users to log in again frequently.

---

## 🔄 Summary Flow Diagram (Textual)

```
[User Login Form] → (POST /login) → [Backend Verifies User]
                             ↓
                   [Server Generates JWT]
                             ↓
                   ← (token) ← [Frontend Stores JWT]
                             ↓
       [Frontend Requests Protected Routes with JWT]
                             ↓
               [Server Verifies JWT and Responds]
```

---

## ✅ Key Takeaways

- **Frontend**

  - Sends login credentials to the backend
  - Stores the JWT after successful login
  - Includes the JWT in headers for protected requests

- **Backend**

  - Authenticates the user credentials
  - Generates and signs the JWT
  - Verifies JWT on each protected request

- **JWT**
  - Serves as proof of authentication
  - Contains user information (e.g., user ID, roles)
  - Is included with each request to access protected resources

---

Let me know if you want:

- A breakdown of this flow with **React + Express**
- The same example using **cookies instead of tokens**
- Refresh token theory

Great questions! Let’s clarify both:

---

## ⏰ When does JWT expire?

- **JWT expiration is set at token creation** by the backend using the `exp` (expiry) claim.
- Typically, JWTs are given a **short lifespan** — like **15 minutes to 1 hour** — for security.
- After expiration:

  - The token becomes **invalid**.
  - The server **rejects requests** with the expired JWT.
  - The user needs a **new token** to continue (e.g., by logging in again or using a refresh token).

---

## 🔄 When is a session refreshed?

- For **stateful sessions** (session IDs stored on server + cookie on client):

  - The **session lifetime** is controlled by the server.
  - A session can be **refreshed/extended** automatically on user activity (like a page load or API call).
  - For example, each time the user sends a valid request, the server updates the session’s expiry timestamp, so the session "stays alive."

- For **stateless JWT auth**, there’s no session on the server to refresh:

  - Instead, you usually implement a **refresh token** mechanism.
  - When the JWT expires, the frontend sends the **refresh token** to get a new JWT without asking the user to log in again.
  - Refresh tokens have a **longer expiry** (days or weeks) and are securely stored.

---

## Summary Points

- **JWT**
  - Expires at the `exp` timestamp (usually short-lived, e.g., 15 minutes to 1 hour)
- **Session (stateful)**
  - Refreshed or extended on user activity by the server updating the session expiry
- **JWT Refresh Token**
  - Used to obtain a new JWT when the old one expires, typically has a longer lifespan

---

To implement **JWT-based login, signup, and forgot password** in a **React frontend**, you’ll interact with a backend (typically Express or Django, etc.) that handles JWT creation and password operations.

Below is a full **theoretical + architectural guide** (no code yet) on **how to implement** these flows **securely and properly**.

---

## 🧠 Architecture Overview

- **Signup**

  - _Frontend (React)_: Collect user data (name, email, password)
  - _Backend (Node/Express)_: Hash password, save to database, return success

- **Login**

  - _Frontend_: Send credentials, receive JWT (access and optional refresh token)
  - _Backend_: Verify credentials, generate and return JWT

- **Protected Route**

  - _Frontend_: Attach JWT in request headers for protected API calls
  - _Backend_: Verify JWT before serving the response

- **Forgot Password**

  - _Frontend_: Enter email, receive password reset link via email
  - _Backend_: Generate reset token, send email with reset link

- **Reset Password**
  - _Frontend_: Open reset link, enter new password
  - _Backend_: Verify reset token, allow password change

---

## ✅ 1. Signup Flow

### 📱 Frontend:

- Create a signup form: `name`, `email`, `password`, `confirm password`
- On submit, send POST request:

```http
POST /api/signup
Content-Type: application/json

{
  "name": "Sanjana",
  "email": "sanjana@example.com",
  "password": "MyStrongPass123"
}
```

### 🛠️ Backend:

- Hash password (e.g., with bcrypt)
- Save user in DB
- Return success message (`201 Created`)

---

## 🔐 2. Login with JWT

### 📱 Frontend:

- User enters email & password
- POST request to `/api/login`

```http
POST /api/login
{
  "email": "sanjana@example.com",
  "password": "MyStrongPass123"
}
```

### 🛠️ Backend:

- Check email & password
- On success:

  - Generate JWT with:

    ```json
    {
      "userId": "12345",
      "email": "sanjana@example.com"
    }
    ```

  - Optionally generate a **refresh token**

- Return:

```json
{
  "token": "JWT_ACCESS_TOKEN",
  "refreshToken": "OPTIONAL_REFRESH_TOKEN"
}
```

### 📱 Frontend stores:

- Store token in `localStorage` or `HttpOnly cookie`
- Add token to `Authorization` header for protected routes

---

## 🔒 3. Accessing Protected Routes

### 📱 Frontend:

Send token in headers:

```http
GET /api/profile
Authorization: Bearer <token>
```

### 🛠️ Backend:

- Middleware checks token
- Decodes and verifies it
- If valid → allows access

---

## ❓ 4. Forgot Password Flow

### 📱 Frontend:

- Forgot password form with email input
- POST request:

```http
POST /api/forgot-password
{
  "email": "sanjana@example.com"
}
```

### 🛠️ Backend:

- Verify user exists
- Generate a **password reset token** (random string or JWT with short expiry)
- Save token in DB or sign JWT
- Send email to user with a link:

```
https://yourfrontend.com/reset-password/<token>
```

---

## 🔁 5. Reset Password

### 📱 Frontend:

- User clicks link → lands on Reset Password page
- Enters new password
- Send request:

```http
POST /api/reset-password
{
  "token": "<token-from-url>",
  "newPassword": "MyNewStrongPass123"
}
```

### 🛠️ Backend:

- Validate token (JWT or DB record)
- Hash new password
- Update password in DB

---

## ✅ Security Tips

- **JWT Storage:** Prefer `HttpOnly cookies` for sensitive apps.
- **Passwords:** Always hash with bcrypt or argon2.
- **Reset Tokens:** Set to expire quickly (e.g., 15 minutes).
- **Rate Limiting:** Apply to login, signup, and reset endpoints.
- **HTTPS:** Always use HTTPS to prevent man-in-the-middle (MITM) attacks.

---

## 📘 Final Notes

- Use libraries like `axios` in React for HTTP requests.
- Backend typically uses `jsonwebtoken`, `bcrypt`, and `nodemailer`.
- You can use `React Context` or Redux to manage auth state.
- You should **log out** by removing the token from localStorage/cookie.

Great question! Understanding **access tokens** and **refresh tokens** is key to building a secure JWT-based authentication system.

---

## 🔐 What is JWT Authentication?

JWT (JSON Web Token) is used to **verify a user's identity** between the client (frontend) and server (backend) without keeping user state on the server (stateless auth).

---

## 🔑 Two Main Tokens

### 1. **Access Token**

- ✅ **Purpose**: Proves the user is logged in.
- 📦 Contains: user ID, email, role, etc.
- 🕒 **Short lifespan** (e.g., 15 mins or 1 hour)
- 🔐 Sent with every protected request (in the `Authorization` header).

  ```http
  Authorization: Bearer <access_token>
  ```

- ❌ When it **expires**, the user can no longer access protected routes unless it's refreshed.

---

### 2. **Refresh Token**

- ✅ **Purpose**: Used to get a **new access token** when the current one expires.
- 🕒 **Longer lifespan** (e.g., 7 days, 30 days)
- 🔒 Stored securely (usually in `HttpOnly` cookies).
- ✅ Usually sent only once during token refresh.

---

## 🧠 Why Use Both?

- **Access Token**

  - Used for: Accessing APIs
  - Expiry: Short (e.g., 15 mins)
  - Where stored: Memory / localStorage
  - Sent with: Every protected request
  - Renewability: Cannot be renewed itself

- **Refresh Token**
  - Used for: Getting new access token
  - Expiry: Long (e.g., 7–30 days)
  - Where stored: HttpOnly cookie
  - Sent with: Only when refreshing
  - Renewability: Used to renew access

---

## 🔄 Flow Example

### ➤ Step 1: Login

- Server returns:
  - Access Token (valid 15 mins)
  - Refresh Token (valid 7 days)

### ➤ Step 2: Make API calls

- Use access token in `Authorization` header.

### ➤ Step 3: Token expires

- Server responds with `401 Unauthorized`.
- Client sends **refresh token** to `/refresh-token` endpoint.

  ```http
  POST /api/refresh-token
  {
    "refreshToken": "<your_refresh_token>"
  }
  ```

### ➤ Step 4: New Access Token issued

- Server verifies refresh token and sends a new access token.

---

## 🛡 Best Practices

- **Refresh token storage:** Use **HttpOnly Secure Cookie**
- **Rotate refresh tokens:** On every refresh, issue a new one
- **Revoke on logout:** Delete refresh token from DB/cookie
- **Refresh endpoint:** Protect it and use **rate-limiting**
- **No refresh on access token:** Access token is short-lived and disposable

---

Let me know if you want:

- A real example using **React + Express**
- Diagram showing the **token refresh flow**
- Cookie vs localStorage discussion

### 🔐 What is an **HttpOnly Cookie**?

An **HttpOnly cookie** is a type of browser cookie that **cannot be accessed via JavaScript** (e.g., using `document.cookie`).

---

## ✅ Why It Matters

> HttpOnly cookies are a **security feature** to protect your authentication tokens (like JWTs) from **cross-site scripting (XSS) attacks**.

---

## 🍪 Normal vs HttpOnly Cookies

| Feature             | Normal Cookie (`document.cookie`) | HttpOnly Cookie                  |
| ------------------- | --------------------------------- | -------------------------------- |
| Access via JS       | ✅ Yes                            | ❌ No                            |
| Sent with HTTP      | ✅ Yes                            | ✅ Yes                           |
| Protection from XSS | ❌ Vulnerable                     | ✅ Safe from JS                  |
| Use case            | Preferences, UI states            | Authentication (JWT, session ID) |

---

## 🔧 How to Set One (from Server)

### Example in Express.js:

```js
res.cookie("refreshToken", token, {
  httpOnly: true,
  secure: true, // Only send on HTTPS
  sameSite: "Strict", // Prevent CSRF
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
});
```

---

## 💬 How It Works in Requests

1. **Server sends**:

```http
Set-Cookie: refreshToken=xyz123; HttpOnly; Secure
```

2. **Browser stores** the cookie securely.

3. **On next request**, browser sends it automatically:

```http
Cookie: refreshToken=xyz123
```

4. **JavaScript cannot read or modify** the cookie:

```js
console.log(document.cookie); // ❌ No HttpOnly cookies will appear
```

---

## 🚫 Without HttpOnly (less secure)

If a malicious script runs on your page (XSS), it can grab all your cookies:

```js
console.log(document.cookie); // ⚠️ Can expose session/JWT tokens
```

---

## 🔐 Summary

- 🧱 Extra Security | Prevents token theft via XSS |
- 🔒 Used For | Storing refresh tokens / session IDs |
- 🔄 Automatically Sent | Sent with every HTTP request by the browser |
- ❌ Can't Access from JS | Which is what makes it secure |

---

Want to see how to implement login with JWT stored in an HttpOnly cookie using React + Express?
