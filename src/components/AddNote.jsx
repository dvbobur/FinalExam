import UpdateNote from "@/components/UpdateNote";
import DeleteNote from "@/components/DeleteNote";
import { Button } from "@/components/ui/button";
import { Save, Loader2 } from "lucide-react";
import MarkText from "@/components/MarkText";

export default function AddNote({ title, content, setTitle, setContent, isEditing, onSave, onDelete, isSaving, editId }) {
  return (
    <div className="w-full lg:w-1/2 order-1 lg:order-2 space-y-4">
      <input
        type="text"
        placeholder="Enter note title*"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border-b mb-10 rounded shadow-2xl shadow-white/15 outline-none backdrop-blur-2xl"
      />

      <MarkText value={content} setValue={setContent} />

      {isEditing ? (
        <div className="flex gap-3">
          <UpdateNote onUpdate={onSave} />
          <DeleteNote noteId={editId} onDelete={onDelete} />
        </div>
      ) : (
        <Button onClick={onSave} className="rounded h-8 cursor-pointer font-bold" variant="secondary" disabled={isSaving} title="Click to save">
          {isSaving ? <Loader2 className="animate-spin" /> : <Save />}
          Save
        </Button>
      )}
    </div>
  );
}
