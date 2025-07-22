export default function NotesList({ notes, startEdit }) {
  if (notes.length == 0) {
    return <p className="text-center mt-[43%]">Start by creating your first note!</p>;
  }

  return (
    <ul className="space-y-2 overflow-y-auto h-[350px] mt-10">
      {notes.map((note) => (
        <li
          key={note.id}
          onClick={() => startEdit(note)}
          className="p-3 rounded backdrop-blur-2xl border border-[#ffffff1e] cursor-pointer transition-transform duration-200 active:scale-98"
          title="Click to view or edit"
        >
          <h3 className="font-semibold text-[20px]">{note.title}</h3>
          <p className="text-sm text-gray-400 mt-1">{note.created_at && new Date(note.created_at).toLocaleString()}</p>
        </li>
      ))}
    </ul>
  );
}
