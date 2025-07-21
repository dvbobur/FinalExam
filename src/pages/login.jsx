import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { getLocal, clearLocal } from "@/components/LocalStorage";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        router.push("/");
      }
    });
  }, [router]);

  async function handleLogin() {
    const res = await supabase.auth.signInWithPassword({ email, password });
    if (res.error) {
      setError(res.error.message);
      return;
    }

    const { title, content } = getLocal();

    const userRes = await supabase.auth.getUser();
    const user = userRes.data.user;

    if (user && (title || content)) {
      await supabase.from("notes").insert([
        {
          title,
          content,
          user_id: user.id,
        },
      ]);
      clearLocal();
    }

    router.push("/");
  }

  return (
    <main>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        aria-label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        aria-label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <p>
        Don't have an account? <a href="/register">Register</a>
      </p>
    </main>
  );
}
