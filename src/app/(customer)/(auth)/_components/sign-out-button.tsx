"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { LogOut, Loader2 } from "lucide-react";
import { SignOut } from "../sign-in/lib/actions";

type SignOutButtonProps = {
  onSignOutStart?: () => void;
};

export default function SignOutButton({ onSignOutStart }: SignOutButtonProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSignOut = () => {
    onSignOutStart?.();

    startTransition(async () => {
      try {
        const res = await SignOut();

        if (res?.error) {
          toast.error("Sign out failed", {
            description: res.error,
          });
          return;
        }

        router.replace(res.redirectUrl ?? "/?logout=success");
        router.refresh();
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
