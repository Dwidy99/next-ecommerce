import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export function refresh(path: string) {
    revalidatePath(path);
}

export function refreshAndRedirect(path: string) {
    revalidatePath(path);
    redirect(path);
}