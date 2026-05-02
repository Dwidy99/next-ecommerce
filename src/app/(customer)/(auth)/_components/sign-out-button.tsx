"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { LogOut, Loader2 } from "lucide-react";
import { SignOut } from "../sign-in/lib/actions";

export default function SignOutButton() {
  const [isPending, startTransition] = useTransition();

  const handleSignOut = () => {
    startTransition(async () => {
      try {
        const res = await SignOut();

        if (res?.error) {
          toast.error("Sign out failed", {
            description: res.error,
          });
          return;
        }
      } catch (error) {
        console.error(error);

        toast.error("Unexpected error occurred", {
          description: "Please try again later.",
        });
      }
    });
  };

  return (
    <button
      onClick={handleSignOut}
      disabled={isPending}
      className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-all
        ${
          isPending
            ? "cursor-not-allowed text-gray-400"
            : "text-red-600 hover:bg-red-50 hover:text-red-700"
        }`}
    >
      {isPending ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Signing out...
        </>
      ) : (
        <>
          <LogOut className="h-4 w-4" />
          Sign Out
        </>
      )}
    </button>
  );
}
