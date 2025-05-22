### 🌐 HTTP Headers – Explained

**HTTP headers** are key-value pairs sent between a client (like your browser or frontend app) and a server during an HTTP request or response. They provide **metadata** about the request/response, such as content type, authorization, caching rules, and more.

---

## 📤 Request Headers (Client ➝ Server)

These are sent by the **client** to provide info about the request.

- `Host`: Specifies the domain of the server (e.g., `Host: example.com`)
- `User-Agent`: Provides information about the browser or client (e.g., `User-Agent: Mozilla/5.0`)
- `Authorization`: Sends credentials, often for authentication (e.g., `Authorization: Bearer <token>`)
- `Content-Type`: Indicates the type of data being sent (e.g., `Content-Type: application/json`)
- `Accept`: Tells the server the expected response format (e.g., `Accept: application/json`)
- `Cookie`: Sends stored cookies to the server (e.g., `Cookie: session_id=abc123`)
- `Referer`: Indicates the page making the request (e.g., `Referer: https://example.com/home`)

---

## 📥 Response Headers (Server ➝ Client)

These are sent by the **server** to provide info about the response.

- `Content-Type`: Specifies the type of response data (e.g., `Content-Type: text/html`)
- `Set-Cookie`: Instructs the client to store a cookie (e.g., `Set-Cookie: token=abc; HttpOnly`)
- `Cache-Control`: Defines caching rules (e.g., `Cache-Control: no-cache`)
- `Access-Control-Allow-Origin`: Sets CORS rules (e.g., `Access-Control-Allow-Origin: *`)
- `Content-Length`: Indicates the size of the response (e.g., `Content-Length: 348`)
- `ETag`: Used for versioning and caching (e.g., `ETag: "abc123etag"`)
- `Location`: Specifies a redirect URL (e.g., `Location: /login`)

---

## 🧰 Common Use Cases

### 1. **API Call with JSON and Token**

```http
POST /api/journal HTTP/1.1
Host: mywellness.app
Authorization: Bearer eyJhbGciOiJIUzI1...
Content-Type: application/json

{
  "entry": "I felt tired today but also proud of finishing my work."
}
```

### 2. **CORS Headers (Server Response)**

```http
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
```

---

## 🧠 Pro Tips

- **CORS errors** are usually due to missing `Access-Control-Allow-Origin`.
- Use `Content-Type` properly (`application/json` vs `multipart/form-data`).
- JWTs or session tokens are usually passed in `Authorization` or `Cookie`.

---

Would you like an example of how to **send or read headers** in Express or fetch in Next.js?
