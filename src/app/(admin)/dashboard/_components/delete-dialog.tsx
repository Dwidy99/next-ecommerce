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
  AlertDialogMedia,
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { AlertTriangle, Trash } from "lucide-react";
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
          <Trash className="mr-2 h-4 w-4" />
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
        <Button
          variant="destructive"
          size="sm"
          className="bg-red-50 text-red-700 ring-1 ring-red-200 hover:bg-red-100 hover:text-red-800"
        >
          <Trash className="mr-2 h-4 w-4" />
          Delete
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-red-50 text-red-600">
            <AlertTriangle className="h-6 w-6" />
          </AlertDialogMedia>
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
