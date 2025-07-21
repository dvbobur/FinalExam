import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function Register() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleRegister() {
    const res = await supabase.auth.signUp({ email: email, password: password });
    if (res.error) {
      setError(res.error.message);
      return;
    }
    router.push("/login");
  }

  return (
    <main>
      <h2>Register</h2>
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
      <button onClick={handleRegister}>Register</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <p>
        Already have an account? <a href="/login">Login</a>
      </p>
    </main>
  );
}
