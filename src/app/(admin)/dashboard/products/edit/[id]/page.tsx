import { redirect } from "next/navigation"

import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { getImageUrl } from "@/lib/supabase"
import { getBrands } from "../../../brands/lib/data"
import { getCategories } from "../../../categories/lib/data"
import { getLocations } from "../../../locations/lib/data"
import FormProduct from "../../_components/form-product"
import { getProductById } from "../../lib/data"

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
  const brands = await getBrands()
  const categories = await getCategories()
  const locations = await getLocations()

  if (!product) {
    redirect("/dashboard/products")
  }

  const defaultImages = product.images?.map((image) => getImageUrl(image, "products")) ?? []

  return (
    <FormProduct type="EDIT" data={product} defaultImages={defaultImages}>
      <div className="grid gap-3">
        <Label htmlFor="category_id">Category</Label>
        <Select
          name="category_id"
          defaultValue={product.category_id.toString()}
          required
        >
          <SelectTrigger
            id="category_id"
            aria-label="Select category"
            className="w-full"
          >
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent position="popper" align="start">
            {categories.map((category) => (
              <SelectItem key={category.id} value={`${category.id}`}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-3">
        <Label htmlFor="brand_id">Brand</Label>
        <Select
          name="brand_id"
          defaultValue={product.brand_id.toString()}
          required
        >
          <SelectTrigger
            id="brand_id"
            aria-label="Select brand"
            className="w-full"
          >
            <SelectValue placeholder="Select brand" />
          </SelectTrigger>
          <SelectContent position="popper" align="start">
            {brands.map((brand) => (
              <SelectItem key={brand.id} value={`${brand.id}`}>
                {brand.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-3">
        <Label htmlFor="location_id">Location</Label>
        <Select
          name="location_id"
          defaultValue={product.location_id.toString()}
          required
        >
          <SelectTrigger
            id="location_id"
            aria-label="Select location"
            className="w-full"
          >
            <SelectValue placeholder="Select location" />
          </SelectTrigger>
          <SelectContent position="popper" align="start">
            {locations.map((location) => (
              <SelectItem key={location.id} value={`${location.id}`}>
                {location.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </FormProduct>
  )
}
