import React from "react";
import FormProduct from "../_components/form-product";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getBrands } from "../../brands/lib/data";
import { getCategories } from "../../categories/lib/data";
import { getLocations } from "../../locations/lib/data";

export default async function CreatePage() {
  const brands = await getBrands();
  const categories = await getCategories();
  const locations = await getLocations();

  return (
    <FormProduct>
      <div className="grid gap-3">
        <Label htmlFor="location">Category</Label>
        <Select>
          <SelectTrigger id="location" aria-label="Select location">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories?.map((cat) => (
              <SelectItem key={cat.id} value={`${cat.id}`}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-3">
        <Label htmlFor="brand">Brand</Label>
        <Select name="brand_id">
          <SelectTrigger id="brand" aria-label="Select Brand">
            <SelectValue placeholder="Select Brand" />
          </SelectTrigger>
          <SelectContent>
            {brands?.map((brand) => (
              <SelectItem key={brand.id} value={`${brand.id}`}>
                {brand.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-3">
        <Label htmlFor="location">Location</Label>
        <Select name="location_id">
          <SelectTrigger id="location" aria-label="Select location">
            <SelectValue placeholder="Select Location" />
          </SelectTrigger>
          <SelectContent>
            {locations?.map((location) => (
              <SelectItem key={location.id} value={`${location.id}`}>
                {location.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </FormProduct>
  );
}
