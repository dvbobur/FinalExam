"use client";
import { getLocal, clearLocal } from "@/components/LocalStorage";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Loader2Icon } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { toast } from "react-hot-toast";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) router.push("/");
    });
  }, []);

  async function handleLogin() {
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      toast.error(error.message);
      setLoading(false);
      return;
    }

    const saved = getLocal();
    const { data } = await supabase.auth.getUser();
    const user = data?.user;

    if (user && (saved.title || saved.content)) {
      await supabase.from("notes").insert([{ title: saved.title, content: saved.content, user_id: user.id }]);
      clearLocal();
    }

    toast.success("Logged in successfully");
    router.push("/");
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-80 space-y-5 px-6 py-10 rounded-md border border-[#ffffff1e] text-center shadow-2xl shadow-white/15 backdrop-blur-2xl anim">
        <h2 className="text-2xl font-semibold">Login</h2>

        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 border-b outline-none" />

        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 border-b outline-none" />

        <Button onClick={handleLogin} className="w-full h-9 flex items-center gap-2 font-bold rounded" variant="secondary" disabled={loading} title="Click to login">
          {loading && <Loader2Icon className="animate-spin" />}
          Login
        </Button>

        <p className="text-sm">
          Don't have an account?
          <a href="/register" className="ml-1 text-blue-600 underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}
