"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Loader2Icon } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { toast } from "react-hot-toast";
import { useState } from "react";

export default function Register() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRegister() {
    setLoading(true);
    const { error } = await supabase.auth.signUp({ email, password });

    if (error) {
      toast.error(error.message);
      setLoading(false);
      return;
    }
    toast.success("Check your email for confirmation link");
    router.push("/login");
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-80 space-y-5 px-6 py-10 rounded-md border border-[#ffffff1e] text-center shadow-2xl shadow-white/15 backdrop-blur-2xl anim">
        <h2 className="text-2xl font-semibold">Register</h2>

        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2  border-b outline-none" />

        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2  border-b outline-none" />

        <Button onClick={handleRegister} className="w-full h-9 flex items-center font-bold gap-2 rounded" variant="secondary" disabled={loading} title="Click to register">
          {loading && <Loader2Icon className="animate-spin" />}
          Register
        </Button>

        <p className="text-sm">
          Already have an account?
          <a href="/login" className="ml-1 text-blue-600 underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
