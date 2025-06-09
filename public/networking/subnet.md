### 🧠 What is a **Subnet Mask**?

A **subnet mask** is a 32-bit number used in **IP networking** to divide an IP address into:

1. **Network portion** (which identifies the subnet)
2. **Host portion** (which identifies the specific device)

It's used to determine **which part of an IP address refers to the network** and **which part refers to the host**.

---

### 📦 Example:

Let's take:

- IP address: `192.168.1.10`
- Subnet mask: `255.255.255.0`

#### 🔍 In binary:

```
IP Address:    11000000.10101000.00000001.00001010  → 192.168.1.10
Subnet Mask:   11111111.11111111.11111111.00000000  → 255.255.255.0
```

- The **first 24 bits** (the ones with `1`s in the subnet mask) → **network**
- The **last 8 bits** → **host**

➡️ This means:

- Network: `192.168.1.0`
- Host: `10` (the device number within the subnet)

---

### 📘 Common Subnet Masks

- **`255.0.0.0`** (`/8`):

  - ~16,777,214 hosts per subnet
  - Used for very large networks

- **`255.255.0.0`** (`/16`):

  - ~65,534 hosts per subnet
  - Common in large organizations

- **`255.255.255.0`** (`/24`):

  - 254 hosts per subnet
  - Typical for home networks and small offices

- **`255.255.255.192`** (`/26`):

  - 62 hosts per subnet
  - Used for small subnets

- **`255.255.255.255`** (`/32`):
  - 1 host per subnet
  - Used for loopback or single-host scenarios

---

### 🔐 Why is it important?

- It allows splitting large networks into smaller **subnets** (like dividing a street into houses).
- Helps **route traffic efficiently**.
- Limits **broadcast domains** (improves performance/security).

---

### 🧩 TL;DR:

A **subnet mask** tells the network which **part of an IP address is the network**, and which part is the **host (device)**. It's essential for IP addressing, routing, and organizing networks.

Would you like a visual diagram or to calculate how many hosts fit in a given subnet?
