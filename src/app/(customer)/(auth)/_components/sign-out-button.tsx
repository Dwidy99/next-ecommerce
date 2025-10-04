"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { LogOut, Loader2 } from "lucide-react";
import { SignOut } from "../sign-in/lib/actions";

export default function SignOutButton() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      const res = await SignOut();
      console.log("res:", res);

      if (res.error) {
        toast.error("Sign out failed", {
          description: res.error,
        });
        return;
      }

      toast.success("✅ Signed out successfully", {
        description: "Redirecting to login page...",
      });

      console.log("toast:", toast);

      startTransition(() => {
        setTimeout(() => router.push("/"), 1200);
      });
    } catch (error) {
      console.error("SignOutButton error:", error);
      toast.error("Unexpected error occurred", {
        description: "Please try again later.",
      });
    }
  };

  return (
    <button
      onClick={handleSignOut}
      disabled={isPending}
      className={`flex w-full items-center gap-2 px-3 py-2 rounded-md text-sm font-medium 
        transition-all duration-200 
        ${
          isPending
            ? "text-gray-400 cursor-not-allowed"
            : "text-red-600 hover:text-red-700 hover:bg-red-50"
        }`}
    >
      {isPending ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Signing out...</span>
        </>
      ) : (
        <>
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </>
      )}
    </button>
  );
}
