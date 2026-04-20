import { redirect } from "next/navigation"
import { getLocationById } from "../data"
import { LocationForm } from "./location-form"

type LocationEditPageProps = {
  params: Promise<{ id: string }> | { id: string }
}

export async function LocationEditPage({ params }: LocationEditPageProps) {
  const { id } = await params
  const location = await getLocationById(id)

  if (!location) {
    redirect("/dashboard/locations")
  }

  return <LocationForm type="EDIT" data={location} />
}
