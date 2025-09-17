import { Button } from "@/components/ui/button";
import { ActionResult } from "@/types";
import { Trash } from "lucide-react";
import React, { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { deleteProduct } from "../lib/actions";

const initialState: ActionResult = {
  error: "",
};

interface FormDeleteProps {
  id: number;
}

function SubmitButton() {
  const { pending } = useFormStatus();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const confirmed = window.confirm("Are you sure delete this data?");
    if (!confirmed) {
      e.preventDefault(); // batalkan submit
    }
  };

  return (
    <Button
      type="submit"
      variant="destructive"
      size="sm"
      disabled={pending}
      onClick={handleClick}
    >
      <Trash className="w-4 h-4 mr-2" /> Delete
    </Button>
  );
}

export default function FormDelete({ id }: FormDeleteProps) {
  const deleteProductWithId = (_: unknown, formData: FormData) =>
    deleteProduct(formData, id);

  const [state, formAction] = useActionState(deleteProductWithId, initialState);
  return (
    <form action={formAction}>
      <input type="hidden" name="id" value={id.toString()} />
      <SubmitButton />
      {state.error && (
        <p className="text-sm text-red-500 mt-2">{state.error}</p>
      )}
    </form>
  );
}
