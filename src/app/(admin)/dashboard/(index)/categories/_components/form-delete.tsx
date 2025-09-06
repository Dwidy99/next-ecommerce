import { Button } from '@/components/ui/button'
import { ActionResult } from '@/types'
import { Trash } from 'lucide-react'
import React, { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import { deleteCategory } from '../lib/action'

const initialState: ActionResult = {
  error: ""
}

interface FormDeleteProps {
  id: number
}

function SubmitButton() {
  const {pending} = useFormStatus();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const confirmed = window.confirm("Yakin ingin menghapus kategori ini?");
    if (!confirmed) {
      e.preventDefault(); // batalkan submit
    }
  }


  return (
    <Button type="submit" variant="destructive" size="sm" disabled={pending} onClick={handleClick}>
      <Trash className='w-4 h-4 mr-2' /> Delete
    </Button>
  )
}

export default function FormDelete({id}: FormDeleteProps) {

  const deleteCategoryWithId = (_: unknown, formData:FormData) => deleteCategory(_, formData)

  const [state, formAction] = useActionState(deleteCategoryWithId, initialState)
  return (
    <form action={formAction}>
       <input type="hidden" name="id" value={id.toString()} />
      <SubmitButton />
      {state.error && (
        <p className="text-sm text-red-500 mt-2">{state.error}</p>
      )}
    </form>
  )
}
