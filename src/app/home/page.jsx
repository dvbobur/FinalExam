"use client";
import { getLocal, saveLocal, clearLocal } from "@/components/LocalStorage";
import { validateNote } from "@/components/Validation";
import SearchNote from "@/components/SearchNote";
import NoteList from "@/components/NoteList";
import AddNote from "@/components/AddNote";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import toast from "react-hot-toast";

export default function Home() {
  const router = useRouter();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        setIsLoggedIn(true);
        getNotes();
      } else {
        const saved = getLocal();
        setTitle(saved.title);
        setContent(saved.content);
      }
    });
  }, []);

  useEffect(() => {
    if (!isLoggedIn) {
      saveLocal(title, content);
    }
  }, [title, content, isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn) {
      getNotes();
    }
  }, [search, isLoggedIn]);

  async function getNotes() {
    const { data, error } = await supabase.from("notes").select("*").order("created_at", { ascending: false }).ilike("title", `%${search}%`).or(`content.ilike.%${search}%`);

    if (error) {
      toast.error("Notes error");
    } else {
      setNotes(data);
    }
  }

  async function saveNote() {
    const result = validateNote(title, content);
    if (!result.valid) {
      toast.error(result.message);
      return;
    }

    if (!isLoggedIn) {
      router.push("/login");
      return;
    }

    setIsSaving(true);
    const { data: userData } = await supabase.auth.getUser();
    const user = userData?.user;

    if (!user) {
      router.push("/login");
      return;
    }

    if (isEditing && editId) {
      await supabase.from("notes").update({ title, content }).eq("id", editId);
      toast.success("Note update");
    } else {
      await supabase.from("notes").insert([{ title, content, user_id: user.id }]);
      toast.success("Note added");
    }
    clearLocal();
    setTitle("");
    setContent("");
    setEditId(null);
    setIsEditing(false);
    setIsSaving(false);
    getNotes();
  }

  async function deleteNote(id) {
    await supabase.from("notes").delete().eq("id", id);
    getNotes();

    if (editId == id) {
      setTitle("");
      setContent("");
      setEditId(null);
      setIsEditing(false);
    }
  }

  function editNote(note) {
    setTitle(note.title);
    setContent(note.content);
    setEditId(note.id);
    setIsEditing(true);
  }

  return (
    <div className="max-w-4xl mx-auto px-5 sm:px-10 lg:px-0 flex flex-col lg:flex-row gap-20 pb-10 lg:gap-6">
      <div className="w-full lg:w-1/2 order-2 lg:order-1 space-y-4">
        <SearchNote search={search} setSearch={setSearch} setNotes={setNotes} />
        <NoteList notes={notes} startEdit={editNote} />
      </div>

      <AddNote
        title={title}
        content={content}
        setTitle={setTitle}
        setContent={setContent}
        isEditing={isEditing}
        onSave={saveNote}
        onDelete={deleteNote}
        isSaving={isSaving}
        editId={editId}
      />
    </div>
  );
}
