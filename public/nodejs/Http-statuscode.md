HTTP status codes are standardized codes returned by web servers to indicate the outcome of a client's request. They are grouped into **five classes** based on the first digit:

---

### ✅ **1xx – Informational**

These codes indicate that the request was received and understood and that the process is continuing.

- **100 Continue** – Request is OK so far; client should continue.
- **101 Switching Protocols** – Server is switching protocols (e.g., to WebSocket).

---

### ✅ **2xx – Success**

These codes mean the request was successfully received, understood, and accepted.

- **200 OK** – The request succeeded.
- **201 Created** – Resource created successfully.
- **202 Accepted** – Request accepted, but not completed yet.
- **204 No Content** – Success, but no response body.

---

### ⚠️ **3xx – Redirection**

Indicates further action is needed (e.g., follow a redirect).

- **301 Moved Permanently** – Resource moved to a new URL permanently.
- **302 Found** – Temporary redirect.
- **304 Not Modified** – Resource hasn't changed since the last request.

---

### ❌ **4xx – Client Errors**

These indicate problems with the client's request.

- **400 Bad Request** – Malformed request syntax or invalid parameters.
- **401 Unauthorized** – Authentication required or failed.
- **403 Forbidden** – Server understood request but refuses to authorize it.
- **404 Not Found** – Resource not found.
- **405 Method Not Allowed** – HTTP method not supported for the resource.
- **409 Conflict** – Request conflict with current state (e.g., duplicate entries).
- **429 Too Many Requests** – Client is rate-limited.

---

### 🚫 **5xx – Server Errors**

These indicate server-side problems.

- **500 Internal Server Error** – Generic error on the server.
- **501 Not Implemented** – Server doesn't support the request method.
- **502 Bad Gateway** – Invalid response from an upstream server.
- **503 Service Unavailable** – Server is temporarily unavailable (e.g., maintenance).
- **504 Gateway Timeout** – Upstream server failed to respond in time.

---

---

### ✅ **2xx – Success Codes**

These indicate that the request was successful.

- **200 OK**: Request was successful and you get a response body (e.g., fetching data, submitting a form).
- **201 Created**: Used when a resource is successfully created (e.g., creating a new user).
- **202 Accepted**: Request accepted for processing, but not completed yet (e.g., background job).
- **204 No Content**: Request succeeded but there’s nothing to return (e.g., after deleting a record).

---

### ⚠️ **3xx – Redirection Codes**

These indicate the client needs to make another request to a different location.

- **301 Moved Permanently**: The requested resource has been permanently moved to a new URL.
- **302 Found**: Temporary redirect; the resource is at a different location for now.
- **304 Not Modified**: Sent when the resource hasn't changed since the last request (used with caching).

---

### ❌ **4xx – Client Error Codes**

These indicate that the problem is on the client's side.

- **400 Bad Request**: The request is malformed or missing required data.
- **401 Unauthorized**: The request lacks valid authentication credentials.
- **403 Forbidden**: The client is authenticated but doesn’t have permission to access the resource.
- **404 Not Found**: The requested resource doesn’t exist.
- **405 Method Not Allowed**: The HTTP method used is not supported for the endpoint.
- **409 Conflict**: The request could not be completed due to a conflict with the current state (e.g., duplicate entry).
- **422 Unprocessable Entity**: The server understands the request but can't process it due to semantic errors (e.g., validation failed).
- **429 Too Many Requests**: The client has sent too many requests in a given amount of time (rate limiting).

---

### 🚫 **5xx – Server Error Codes**

These indicate that something went wrong on the server.

- **500 Internal Server Error**: A generic error occurred on the server.
- **501 Not Implemented**: The server doesn’t support the requested functionality.
- **502 Bad Gateway**: A proxy server received an invalid response from the upstream server.
- **503 Service Unavailable**: The server is temporarily unavailable (e.g., due to overload or maintenance).
- **504 Gateway Timeout**: The server didn’t receive a timely response from another server it needed to contact.

---
