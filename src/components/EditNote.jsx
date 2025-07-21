export default function EditNote(props) {
  function handleEdit() {
    props.setTitle(props.note.title);
    props.setContent(props.note.content);
    props.setEditId(props.note.id);
    props.setIsEditing(true);
  }

  return <button onClick={handleEdit}>Tahrirlash</button>;
}
