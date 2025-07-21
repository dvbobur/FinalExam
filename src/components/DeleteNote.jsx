export default function DeleteNote(props) {
  function handleClick() {
    props.onDelete(props.noteId);
  }

  return <button onClick={handleClick}>O‘chirish</button>;
}
