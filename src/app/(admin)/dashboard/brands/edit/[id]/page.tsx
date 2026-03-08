import FormBrand from "../../_components/form-brand";
import { getBrandById } from "../../lib/data";
import { redirect } from "next/navigation";

export default async function EditPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const brand = await getBrandById(id);

  if (!brand) {
    redirect("/dashboard/brands");
  }

  return <FormBrand type="EDIT" data={brand} />;
}
