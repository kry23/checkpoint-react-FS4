import React, { useState } from "react";

function ListItem({ item, deleteItem, updateItem }) {
  const { id, timestamp, text } = item;

  return (
    <>
      <span>{text?.length}</span>
      <span>{text}</span>
      <button onClick={() => deleteItem(id)}>delete</button>
      <button onClick={() => updateItem(id)}>update</button>
      <div style={{ fontSize: "12px", color: "gray" }}>
        {"Posted at " + timestamp.toUTCString()}
      </div>
    </>
  );
}

export default ListItem;
