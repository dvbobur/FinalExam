import React from "react";

export default function AddNote(props) {
  function handleSubmit() {
    props.onAdd({ title: props.title, content: props.content });
  }

  return (
    <div>
      <input
        placeholder="Title"
        value={props.title}
        onChange={function (e) {
          props.setTitle(e.target.value);
        }}
      />
      <textarea
        placeholder="Content"
        value={props.content}
        onChange={function (e) {
          props.setContent(e.target.value);
        }}
      />
      <button onClick={handleSubmit}>{props.isLoggedIn ? "Saqlash" : "Login qilish"}</button>
    </div>
  );
}
