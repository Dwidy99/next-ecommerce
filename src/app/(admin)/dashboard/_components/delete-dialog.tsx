"use client";

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Trash } from "lucide-react";
import { useFormStatus } from "react-dom";

interface DeleteDialogProps {
  id: number;
  action: (formData: FormData) => void | Promise<void>;
  title?: string;
  description?: string;
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" variant="destructive" disabled={pending}>
      {pending ? (
        <>
          <Spinner data-icon="inline-start" />
          Deleting...
        </>
      ) : (
        <>
          <Trash className="w-4 h-4 mr-2" />
          Delete
        </>
      )}
    </Button>
  );
}

export default function DeleteDialog({
  id,
  action,
  title = "Delete Data",
  description = "This action cannot be undone.",
}: DeleteDialogProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="sm">
          <Trash className="w-4 h-4 mr-2" />
          Delete
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>

        <form action={action}>
          <input type="hidden" name="id" value={String(id)} />

          <AlertDialogFooter>
            <AlertDialogCancel type="button">Cancel</AlertDialogCancel>

            <SubmitButton />
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
