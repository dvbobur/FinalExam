import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function Logout() {
  const router = useRouter();

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  return <button onClick={handleLogout}>Chiqish</button>;
}
