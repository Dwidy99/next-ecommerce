"use client";

import { useTransition } from "react";
import { LogOut } from "lucide-react";
import { SignOut } from "../sign-in/lib/actions";

export default function SignOutButton() {
  const [isPending, startTransition] = useTransition();

  async function handleSignOut() {
    // Jalankan tanpa menunggu return ActionResult (karena redirect)
    try {
      await SignOut();
    } catch (err) {
      console.error("Sign out failed:", err);
    }
  }

  return (
    <button
      type="button"
      onClick={() => startTransition(() => handleSignOut())}
      disabled={isPending}
      className="flex items-center gap-2 text-red-600 hover:text-red-700 cursor-pointer w-full px-2 py-1"
    >
      <LogOut className="w-4 h-4" />
      {isPending ? "Signing out..." : "Sign Out"}
    </button>
  );
}
