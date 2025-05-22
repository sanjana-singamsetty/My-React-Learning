## 🛠 Step-by-Step React + TypeScript Setup

### ✅ Prerequisites:

- [Node.js](https://nodejs.org/) installed (version 14+)
- npm or yarn (comes with Node)

---

### 1️⃣ Create React App with TypeScript

```bash
npx create-react-app my-app --template typescript
# OR using yarn
yarn create react-app my-app --template typescript
```

> `my-app` is your project folder name.

---

### 2️⃣ Navigate into the Project

```bash
cd my-app
```

---

### 3️⃣ Start the Development Server

```bash
npm start
# OR
yarn start
```

This will run your app at `http://localhost:3000/`

---

### 4️⃣ Explore the File Structure

Important folders/files:

```
my-app/
├── public/
├── src/
│   ├── App.tsx       // main component
│   ├── index.tsx     // entry point
│   ├── react-app-env.d.ts  // React environment types
│   └── ...
├── tsconfig.json     // TypeScript config
├── package.json
```

---

### 5️⃣ Add a New Component

Create a file `src/components/Hello.tsx`

```tsx
import React from "react";

interface HelloProps {
  name: string;
}

const Hello: React.FC<HelloProps> = ({ name }) => {
  return <h1>Hello, {name}!</h1>;
};

export default Hello;
```

Then use it inside `App.tsx`:

```tsx
import Hello from "./components/Hello";

function App() {
  return (
    <div>
      <Hello name="Sanjana" />
    </div>
  );
}
```

---

### 6️⃣ Linting (optional but recommended)

Install ESLint and Prettier:

```bash
npm install --save-dev eslint prettier eslint-config-prettier eslint-plugin-react eslint-plugin-react-hooks @typescript-eslint/eslint-plugin @typescript-eslint/parser
```

Set up `.eslintrc.json` and `.prettierrc` or use VS Code extensions.

---
