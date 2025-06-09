### 🤝 What is a **3-Way Handshake** in TCP?

The **3-way handshake** is the process TCP uses to **establish a reliable connection** between a client and a server **before** data transfer begins.

---

## 🔁 Steps of the 3-Way Handshake

Let’s say a client wants to connect to a server:

### 🔹 1. **SYN** – Client → Server

Client sends a **SYN** (synchronize) packet to the server to request a connection.

> "Hey Server, I want to start a connection. Here’s my sequence number: `x`."

---

### 🔹 2. **SYN-ACK** – Server → Client

Server receives the SYN, and replies with a **SYN-ACK** (synchronize + acknowledge).

> "Got it! Here's my sequence number: `y`, and I acknowledge yours: `x + 1`."

---

### 🔹 3. **ACK** – Client → Server

Client responds with an **ACK** (acknowledge) to confirm everything.

> "Thanks! Acknowledging your sequence number `y + 1`. Let's start sending data."

---

## ✅ Result:

Now both sides are **synchronized**, and the connection is **established**. Data transfer can begin.

---

## 🔁 Visual Summary:

```
Client                        Server
  | ------ SYN (x) -------->  |
  | <--- SYN-ACK (y, x+1) --- |
  | ------ ACK (y+1) -------> |
```

---

### 📘 Why is it needed?

- Ensures **both parties are ready** to communicate.
- Synchronizes **initial sequence numbers**.
- Confirms that both sides **can send and receive**.

---
