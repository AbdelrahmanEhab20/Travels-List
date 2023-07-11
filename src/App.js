import { useState } from "react";

// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: false },
//   { id: 2, description: "Socks", quantity: 12, packed: false },
//   { id: 3, description: "Charger", quantity: 1, packed: true },
// ];

export default function App() {
  const [items, setItems] = useState([]);
  function handleAddItem(item) {
    setItems((items) => [...items, item]);
  }
  function handDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }
  function handUpdateItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItem} />
      <PackingList
        onDeleteItem={handDeleteItem}
        onUpdateItem={handUpdateItem}
        items={items}
      />
      <Stats items={items} />
    </div>
  );
}

// All components that we need

// 1- Header (Logo section)
function Logo() {
  return <h1>🏝️ Far Away 💼</h1>;
}
// 2- enter data (Form section)
function Form({ onAddItems }) {
  // control elements
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [countID, setCountID] = useState(100540);

  function handleSubmit(event) {
    setCountID((value) => value + 3030);
    event.preventDefault();

    if (!description) return;
    const newPackedItem = {
      description,
      quantity,
      packed: false,
      id: countID,
    };
    onAddItems(newPackedItem);

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
function PackingList({ items, onDeleteItem, onUpdateItem }) {
  return (
    <div className="list">
      <ul>
        {items.map((singleItem) => (
          <Item
            handleDeleteItem={onDeleteItem}
            handleUpdateItem={onUpdateItem}
            key={singleItem.id}
            item={singleItem}
          />
        ))}
      </ul>
    </div>
  );
}

//--- Single Item Component ---
function Item({ item, handleDeleteItem, handleUpdateItem }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => handleUpdateItem(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        ({item.quantity}) {item.description}
      </span>
      <button onClick={() => handleDeleteItem(item.id)}>❌</button>
    </li>
  );
}
// 4- statistics (how much we finish section)
function Stats({ items, packedItems }) {
  if (!items.length)
    return (
      <p className="stats">
        <em>Start adding some items to your packing list 🚀</em>
      </p>
    );
  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const percentage = Math.round((numPacked / numItems) * 100);
  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? "You got everything! Ready to go ✈️"
          : ` 💼 You have ${numItems} items on your list, and you already packed ${numPacked} (${percentage}%)`}
      </em>
    </footer>
  );
}
