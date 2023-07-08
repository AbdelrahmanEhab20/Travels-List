import { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "Charger", quantity: 1, packed: true },
];

export default function App() {
  return (
    <div className="app">
      <Logo />
      <Form />
      <PackingList />
      <Stats />
    </div>
  );
}

// All components that we need

// 1- Header (Logo section)
function Logo() {
  return <h1>🏝️ Far Away 💼</h1>;
}
// 2- enter data (Form section)
function Form() {
  // control elements
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);
  function handleSubmit(event) {
    let countID = 1050;
    event.preventDefault();
    // console.log("event Data");
    // console.log(event);
    if (!description) return;
    const newPackedItem = {
      description,
      quantity,
      packed: false,
      id: countID + 5135,
    };
    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>what do you need for your 😍 trip?</h3>
      <select
        value={quantity}
        onChange={(eventChange) =>
          setQuantity(Number(eventChange.target.value))
        }
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(eventChange) => setDescription(eventChange.target.value)}
      />
      <button>Add</button>
    </form>
  );
}
// 3- listing of stuff (List items section)
function PackingList() {
  return (
    <div className="list">
      <ul>
        {initialItems.map((singleItem) => (
          <Item key={singleItem.id} item={singleItem} />
        ))}
      </ul>
    </div>
  );
}

//--- Single Item Component ---
function Item({ item }) {
  return (
    <li>
      <input type="checkbox" />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        ({item.quantity}) {item.description}
      </span>
      <button>❌</button>
    </li>
  );
}
// 4- statistics (how much we finish section)
function Stats() {
  return (
    <footer className="stats">
      <em>💼 You have X items on your list, and you already packed X (X %)</em>
    </footer>
  );
}
