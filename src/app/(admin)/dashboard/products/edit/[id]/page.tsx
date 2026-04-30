import { redirect } from "next/navigation"

import { getImageUrl } from "@/lib/supabase"
import FormProduct from "../../_components/form-product"
import { getProductById, getProductFormOptions } from "../../lib/data"

type EditProductPageProps = {
  params: Promise<{ id: string }> | { id: string }
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  const { id } = await params
  const productId = Number(id)

  if (!id || Number.isNaN(productId)) {
    redirect("/dashboard/products")
  }

  const product = await getProductById(productId)
  const options = await getProductFormOptions()

  if (!product) {
    redirect("/dashboard/products")
  }

  const defaultImages = product.images?.map((image) => getImageUrl(image, "products")) ?? []

  return (
    <FormProduct
      type="EDIT"
      data={product}
      options={options}
      defaultImages={defaultImages}
    />
  )
}
