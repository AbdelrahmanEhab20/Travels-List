import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
// 2- enter data (Form section)
export default function Form({ onAddItems }) {
  // control elements
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);
  // const [countID, setCountID] = useState(100540);

  function handleSubmit(event) {
    // setCountID((value) => value + 3030);
    event.preventDefault();

    if (!description) return;
    const newPackedItem = {
      description,
      quantity,
      packed: false,
      id: uuidv4(),
    };
    onAddItems(newPackedItem);

    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>what do you need for your 😍 trip?</h3>
      <div className="fieldsBlock">
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
      </div>
    </form>
  );
}
