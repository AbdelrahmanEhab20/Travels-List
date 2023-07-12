import { useState } from "react";
import Logo from "./Logo";
import Form from "./From";
import PackingList from "./PackingList";
import Stats from "./Stats";

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
  function handClearAllItems() {
    const confirmedClear = window.confirm(
      "Are you sure you want to clear all items of the list?"
    );
    if (confirmedClear) {
      setItems([]);
    }
  }
  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItem} />
      <PackingList
        onDeleteItem={handDeleteItem}
        onUpdateItem={handUpdateItem}
        items={items}
        onClearList={handClearAllItems}
      />
      <Stats items={items} />
    </div>
  );
}
