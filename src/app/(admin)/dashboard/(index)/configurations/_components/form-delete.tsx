"use client";

import { useTransition } from "react";
import { deleteConfiguration } from "../lib/actions";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function FormDelete({ id }: { id: number }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const onDelete = () => {
    startTransition(async () => {
      await deleteConfiguration(id);
      router.push("/dashboard/configurations");
    });
  };

  return (
    <div className="p-6 text-center space-y-4">
      <p>Are you sure you want to delete this configuration?</p>
      <Button variant="destructive" onClick={onDelete} disabled={isPending}>
        {isPending ? "Deleting..." : "Yes, Delete"}
      </Button>
    </div>
  );
}
