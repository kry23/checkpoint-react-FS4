import React, { useEffect, useState } from "react";
import ListItem from "./ListItem";

function List() {
  const [items, setItems] = useState([]);
  const [item, setItem] = useState("");
  const [counter, setCounter] = useState(1);
  const [editing, setEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  useEffect(() => {
    const storedItems = localStorage.getItem("items");
    if (storedItems) {
      setItems(JSON.parse(storedItems));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
    setCounter(items.length + 1);
  }, [items]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setItems([
      ...items,
      { text: item, id: counter, timestamp: new Date() || null },
    ]);
    setItem("");
  };
  const updateItem = (id) => {
    const it = items.find((item) => item.id === id);
    setEditingId(id);
    setItem(it.text);
    setEditing(true);
  };
  const deleteItem = (id) => {
    setItems(items.filter((it) => it.id !== id));
  };

  const editItem = (e) => {
    e.preventDefault();

    setItems(
      items.map((it) => (it.id === editingId ? { id: editingId, ...item } : it))
    );
    setItem("");
    setEditingId(null);
    setEditing(false);
  };
  return (
    <>
      <form onSubmit={editing ? editItem : handleSubmit}>
        <input
          type="text"
          value={item}
          onChange={(e) => setItem(e.target.value)}
        />
        <button type="submit">{editing ? "Update" : "Save"}</button>
      </form>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <ListItem
              item={item}
              deleteItem={deleteItem}
              updateItem={updateItem}
            />
          </li>
        ))}
      </ul>
    </>
  );
}

export default List;
