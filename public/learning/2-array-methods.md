---

### 🔍 **Preview / Inspecting Methods**

* `console.log(arr)` – Logs the entire array
* `arr.forEach(x => console.log(x))` – Iterates and logs each element
* `arr.slice(0, 3)` – Returns a shallow copy of part of the array
* `arr.join(', ')` – Joins elements into a string

---

### 🛠️ **Manipulation Methods**

- `arr.push(10)` – Adds element to the end (mutates)
- `arr.pop()` – Removes the last element (mutates)
- `arr.shift()` – Removes the first element (mutates)
- `arr.unshift(0)` – Adds element to the beginning (mutates)
- `arr.splice(1, 2)` – Adds/removes elements at an index (mutates)
- `arr.sort((a, b) => a - b)` – Sorts the array in place (mutates)
- `arr.reverse()` – Reverses the array in place (mutates)

---

### 🔄 **Transformation Methods**

- `arr.map(x => x * 2)` – Transforms each element
- `arr.filter(x => x > 5)` – Filters elements that match a condition
- `arr.reduce((a, b) => a + b)` – Reduces array to a single value
- `[[1,2],[3,4]].flat()` – Flattens nested arrays
- `arr.flatMap(x => [x, x * 2])` – Map + flatten in one step

---

### ❓ **Search & Check Methods**

- `arr.find(x => x > 3)` – Finds the first matching element
- `arr.findIndex(x => x > 3)` – Finds the index of the first match
- `arr.includes(5)` – Checks if a value exists
- `arr.indexOf(5)` – Gets the index of a value
- `arr.some(x => x > 10)` – Checks if **at least one** matches
- `arr.every(x => x > 0)` – Checks if **all** match

---

### 🔗 **Combining and Copying Methods**

- `arr.concat([6, 7])` – Merges arrays (non-mutating)
- `arr.slice(1, 4)` – Copies part of the array (non-mutating)
- `arr.copyWithin(0, 2)` – Copies part within the same array (mutates)
- `arr.fill(0, 1, 3)` – Replaces values in a range (mutates)
