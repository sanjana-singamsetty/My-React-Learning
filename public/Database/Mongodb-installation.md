---

## 🛠️ Step-by-Step: Installing MongoDB 8.0 on macOS

### ✅ Prerequisites

- You must have **Homebrew installed** on your Mac.
  If not, install it using:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

---

### 📥 Step 1: Tap MongoDB's Homebrew Source

```bash
brew tap mongodb/brew
```

> This command lets you access MongoDB’s official formulae.

---

### 🔄 Step 2: Update Homebrew

```bash
brew update
```

> Ensures Homebrew and its packages are up to date.

---

### 📦 Step 3: Install MongoDB 8.0

```bash
brew install mongodb-community@8.0
```

> You can replace `8.0` with a different version if needed.

---

### 🧪 Tip (Optional)

If you get a `ChecksumMismatchError`, follow [MongoDB's troubleshooting guide](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-os-x/#troubleshooting-checksummismatcherror).

---

### 📂 Step 4: Know the Installed Paths

Depending on your Mac's chip, files are located differently:

#### ✅ Intel Processor:

- Config: `/usr/local/etc/mongod.conf`
- Logs: `/usr/local/var/log/mongodb`
- Data: `/usr/local/var/mongodb`

#### ✅ Apple Silicon (M1, M2, M3):

- Config: `/opt/homebrew/etc/mongod.conf`
- Logs: `/opt/homebrew/var/log/mongodb`
- Data: `/opt/homebrew/var/mongodb`

To confirm your Homebrew path:

```bash
brew --prefix
```

---

## 🚀 Step-by-Step: Running MongoDB 8.0

### ▶️ Option 1: Run as a macOS Service (Recommended)

```bash
brew services start mongodb-community@8.0
```

> MongoDB starts automatically in the background and restarts on reboot.

To stop the service:

```bash
brew services stop mongodb-community@8.0
```

---

### ▶️ Option 2: Run Manually as a Background Process

Use this if you don’t want MongoDB to start automatically.

#### For Intel-based Macs:

```bash
mongod --config /usr/local/etc/mongod.conf --fork
```

#### For Apple Silicon Macs:

```bash
mongod --config /opt/homebrew/etc/mongod.conf --fork
```

> `--fork` tells MongoDB to run in the background.

---

## ✅ To Check if It's Running

Run the MongoDB Shell:

```bash
mongosh
```

You should see a prompt like this:

```bash
test>
```

You're now connected to your local MongoDB server!

---
