"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import RichContentInput from "@/components/MarkText";
import { saveLocal, getLocal, clearLocal } from "@/components/LocalStorage";

export default function Home() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [notes, setNotes] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [editId, setEditId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [search, setSearch] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        setIsLoggedIn(true);
        fetchNotes();
      } else {
        const saved = getLocal();
        setTitle(saved.title);
        setContent(saved.content);
      }
    });
  }, []);

  useEffect(() => {
    if (!isLoggedIn) saveLocal(title, content);
  }, [title, content, isLoggedIn]);

  function fetchNotes() {
    let query = supabase.from("notes").select();

    if (search.trim()) {
      query = query.or(`title.ilike.%${search}%,content.ilike.%${search}%`);
    }

    query.then(({ data }) => setNotes(data || []));
  }

  useEffect(() => {
    if (isLoggedIn) fetchNotes();
  }, [search, isLoggedIn]);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) setEmail(data.user.email);
    });
  }, []);

  async function saveNote() {
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }

    const { data: userData } = await supabase.auth.getUser();
    const user = userData?.user;

    if (!user) {
      router.push("/login");
      return;
    }

    if (isEditing && editId) {
      await supabase.from("notes").update({ title, content }).eq("id", editId);
    } else {
      await supabase.from("notes").insert([{ title, content, user_id: user.id }]);
    }

    clearLocal();
    setTitle("");
    setContent("");
    setEditId(null);
    setIsEditing(false);
    fetchNotes();
  }

  function startEdit(note) {
    setTitle(note.title);
    setContent(note.content);
    setEditId(note.id);
    setIsEditing(true);
  }

  async function deleteNote(id) {
    await supabase.from("notes").delete().eq("id", id);
    fetchNotes();
  }

  async function logout() {
    await supabase.auth.signOut();
    setIsLoggedIn(false);
    router.push("/login");
  }

  return (
    <div className="bg-[#101017]">
      <h2 tabIndex="0">Notes</h2>
      <p tabIndex="0">Salom, {email ? email : "foydalanuvchi"}</p>

      {isLoggedIn ? (
        <button onClick={logout} aria-label="Logout from your account">
          Logout
        </button>
      ) : (
        <button onClick={() => router.push("/login")} aria-label="Go to login page">
          Login
        </button>
      )}

      <label htmlFor="search" className="sr-only">
        Search notes
      </label>
      <input
        id="search"
        type="search"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        aria-label="Search notes"
      />

      <label htmlFor="title" className="sr-only">
        Note title
      </label>
      <input
        id="title"
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        aria-required="true"
      />

      <label htmlFor="content" className="sr-only">
        Note content
      </label>
      <RichContentInput value={content} setValue={setContent} ariaLabel="Note content" />

      <button onClick={saveNote} aria-label={isEditing ? "Update note" : "Save note"}>
        {isEditing ? "Yangilash" : "Saqlash"}
      </button>

      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            <h3 tabIndex="0">{note.title}</h3>
            <div dangerouslySetInnerHTML={{ __html: note.content }} aria-label="Note content" />
            <button onClick={() => startEdit(note)} aria-label={`Edit note titled ${note.title}`}>
              Tahrirlash
            </button>
            <button onClick={() => deleteNote(note.id)} aria-label={`Delete note titled ${note.title}`}>
              O‘chirish
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
