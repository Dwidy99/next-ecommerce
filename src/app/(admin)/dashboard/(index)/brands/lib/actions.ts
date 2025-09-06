import { ActionResult } from "@/types";
import { redirect } from "next/navigation";

export async function postBrand(
    _:unknown,
    formData: FormData,
): Promise<ActionResult>{
    console.log(formData.get("name"))

    return redirect("/dashboard/brands");
}