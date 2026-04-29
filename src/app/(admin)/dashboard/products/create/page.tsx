import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import FormProduct from "../_components/form-product"
import { getBrands } from "../../brands/lib/data"
import { getCategories } from "../../categories/lib/data"
import { getLocations } from "../../locations/lib/data"

export default async function CreateProductPage() {
  const brands = await getBrands()
  const categories = await getCategories()
  const locations = await getLocations()

  return (
    <FormProduct type="ADD" data={null}>
      <div className="grid gap-3">
        <Label htmlFor="category_id">Category</Label>
        <Select name="category_id" required>
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
        <Select name="brand_id" required>
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
        <Select name="location_id" required>
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

