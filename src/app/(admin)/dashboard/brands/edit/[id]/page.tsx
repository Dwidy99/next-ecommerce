import FormBrand from "../../_components/form-brand"
import { getBrandById } from "../../lib/data"
import { redirect } from "next/navigation"

type EditBrandPageProps = {
  params: Promise<{ id: string }> | { id: string }
}

export default async function EditBrandPage({ params }: EditBrandPageProps) {
  const { id } = await params
  const brand = await getBrandById(id)

  if (!brand) {
    redirect("/dashboard/brands")
  }

  return <FormBrand type="EDIT" data={brand} />
}

