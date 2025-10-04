"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { LogOut, Loader2 } from "lucide-react";
import { SignOut } from "../sign-in/lib/actions";

export default function SignOutButton() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSignOut = () => {
    startTransition(async () => {
      const res = await SignOut();

      if (res.error) {
        toast.error("❌ Failed to sign out", {
          description: res.error,
        });
        return;
      }

      toast.success("✅ Signed out successfully", {
        description: "Redirecting to login page...",
      });

      setTimeout(() => router.push("/sign-in"), 1500);
    });
  };

  return (
    <button
      onClick={handleSignOut}
      disabled={isPending}
      className="flex items-center gap-2 text-red-600 hover:text-red-700 cursor-pointer w-full px-2 py-1"
    >
      {isPending ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          Signing out...
        </>
      ) : (
        <>
          <LogOut className="w-4 h-4" />
          Sign Out
        </>
      )}
    </button>
  );
}
