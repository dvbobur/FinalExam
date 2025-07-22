import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function Logout() {
  const router = useRouter();

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  return <button onClick={handleLogout}>Logo ut</button>;
}
