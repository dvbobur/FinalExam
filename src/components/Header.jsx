"use client";
import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function Header() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        setIsLoggedIn(true);
        setEmail(data.session.user.email);
      }
    });
  }, []);

  async function logout() {
    await supabase.auth.signOut();
    setIsLoggedIn(false);
    router.push("/login");
  }

  return (
    <div className="flex items-center justify-between py-3 mb-12 max-w-4xl mx-auto rounded-b px-5 sm:px-10 lg:px-0">
      <a href="/" className="text-[28px] font-semibold">
        noteapp
      </a>
      <div className="flex items-center gap-3">
        <p className="truncate max-w-[100px] sm:max-w-none">{email || "No account"}</p>
        {isLoggedIn ? (
          <Button onClick={logout} className="rounded h-7 cursor-pointer" variant="secondary" title="Log out">
            <LogOut />
          </Button>
        ) : (
          <Button onClick={() => router.push("/login")} className="rounded h-7 cursor-pointer" variant="secondary" title="Log in">
            <User />
          </Button>
        )}
      </div>
    </div>
  );
}
