import React from "react";
import FormLocation from "../../_components/form-location";
import { getLocationById } from "../../lib/data";
import { redirect } from "next/navigation";

type EditPageProps = {
  params: Promise<{ id: string }> | { id: string };
};

export default async function EditPage({ params }: EditPageProps) {
  const { id } = await params;
  const data = await getLocationById(id);

  if (!data) {
    redirect("/dashboard/locations");
  }

  return <FormLocation type="EDIT" data={data} />;
}
