import { useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Search } from "lucide-react";

export default function SearchNote({ search, setSearch, setNotes }) {
  useEffect(() => {
    async function fetchNotes() {
      const { data, error } = await supabase.from("notes").select("*").order("created_at", { ascending: false }).or(`title.ilike.%${search}%,content.ilike.%${search}%`);
      if (!error) setNotes(data || []);
    }
    fetchNotes();
  }, [search, setNotes]);

  return (
    <div className="relative w-full">
      <input
        type="search"
        placeholder="Search by title or content..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 pr-10 border-b rounded outline-none backdrop-blur-2xl shadow-2xl shadow-white/15"
      />
      <Search className="absolute right-3 top-1.5 text-gray-400" />
    </div>
  );
}
