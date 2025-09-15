import React from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import FormProduct from "../../_components/form-product";
import { getBrands } from "../../../brands/lib/data";
import { getCategories } from "../../../categories/lib/data";
import { getLocations } from "../../../locations/lib/data";
import { getProductById } from "../../lib/data";
import { redirect } from "next/navigation";

export default async function EditPage({ params }: { params: { id: string } }) {
  const resolvedParams = await Promise.resolve(params); // ✅ paksa resolve Proxy
  const id = Number(resolvedParams.id);

  if (!resolvedParams.id || isNaN(id)) {
    console.error("Invalid product ID:", resolvedParams.id);
    throw new Error("Invalid product ID");
  }

  const product = await getProductById(id);
  const brands = await getBrands();
  const categories = await getCategories();
  const locations = await getLocations();

  if (!product) {
    return redirect("/dashboard/products");
  }

  const imageBaseUrl =
    "https://ypguddizaarcqalpozre.supabase.co/storage/v1/object/public/e-commerce/public/products/";
  const defaultImages = product.images?.map((img) => imageBaseUrl + img) ?? [];

  return (
    <FormProduct type="EDIT" data={product} defaultImages={defaultImages}>
      <div className="grid gap-3">
        <Label htmlFor="category_id">Category</Label>

        <Select
          name="category_id"
          defaultValue={product?.category_id.toString()}
        >
          <SelectTrigger id="category" aria-label="Select category">
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

        <Select name="brand_id" defaultValue={product?.brand_id.toString()}>
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

        <Select
          name="location_id"
          defaultValue={product?.location_id.toString()}
        >
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
