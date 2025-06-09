### 🧠 What is **Subnetting**?

**Subnetting** is the process of dividing a large network (IP address block) into **smaller, manageable subnetworks** (subnets). It helps improve **network performance**, **security**, and **efficiency** by reducing congestion and isolating traffic.

---

## 🧩 Why Subnetting?

Let’s say you get an IP block like `192.168.0.0/24` (which contains **256 IP addresses**). But you don’t need all of them in one flat network. Instead:

- You might want to break it into **4 smaller groups** (subnets) of 64 IPs each.
- Or separate devices like HR, Finance, and Engineering.

---

## 📚 Key Concepts in Subnetting

| Term                | Meaning                                                   |
| ------------------- | --------------------------------------------------------- |
| **IP Address**      | A unique address given to a device (e.g., `192.168.1.10`) |
| **Subnet Mask**     | Defines how much of the IP is **network vs host**         |
| **Network Portion** | Identifies the subnet                                     |
| **Host Portion**    | Identifies devices in that subnet                         |
| **CIDR Notation**   | Shorthand for subnet mask (e.g., `/24` = 255.255.255.0)   |

---

## 🔢 Example

Let’s say you have this:

- IP address: `192.168.1.10`
- Subnet mask: `255.255.255.0` (or `/24`)

This means:

- **Network** = `192.168.1.0`
- **Host range** = `192.168.1.1` to `192.168.1.254`
- **Broadcast** = `192.168.1.255`

If you want to split that `/24` into **2 equal subnets**, you change to `/25` (which gives 128 IPs per subnet).

---

## 📊 Subnetting Table (Quick View)

| CIDR | Subnet Mask     | # of Hosts |
| ---- | --------------- | ---------- |
| /24  | 255.255.255.0   | 254        |
| /25  | 255.255.255.128 | 126        |
| /26  | 255.255.255.192 | 62         |
| /27  | 255.255.255.224 | 30         |
| /28  | 255.255.255.240 | 14         |

---

## ✅ Benefits of Subnetting

- ✔️ **Reduces network traffic**
- ✔️ **Improves performance**
- ✔️ **Better IP address utilization**
- ✔️ **Enhances security & isolation**

---

Great question!

You're asking: **Why does a `/24` subnet (i.e., `255.255.255.0`) give 254 usable IP addresses?**

---

### 🔍 Let's break it down:

- A `/24` subnet = **2⁸ = 256 IP addresses** (because 8 bits are reserved for host part).

  > Example range: `192.168.1.0` → `192.168.1.255`

But **not all 256 IPs are usable**.

---

### ❌ Two IPs are **reserved** in every subnet:

1. **Network Address** – the **first** IP

   - Example: `192.168.1.0`
   - It **identifies the subnet itself**, not a device.

2. **Broadcast Address** – the **last** IP

   - Example: `192.168.1.255`
   - Used to send messages to **all devices in the subnet**.

---

### ✅ So usable IPs =

```
256 (total) - 2 (reserved) = 254 usable IPs
```

| IP Address                      | Role                  |
| ------------------------------- | --------------------- |
| `192.168.1.0`                   | Network Address       |
| `192.168.1.1` - `192.168.1.254` | ✅ Usable for devices |
| `192.168.1.255`                 | Broadcast Address     |

---
